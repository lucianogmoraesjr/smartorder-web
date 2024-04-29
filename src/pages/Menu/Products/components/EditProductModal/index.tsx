import { AxiosError, CanceledError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Product } from '@/@types/Product';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import ProductsService from '@/services/ProductsService';
import UploadService from '@/services/UploadService';

import { ProductForm } from '../ProductForm';
import { ProductFormData } from '../ProductForm/useProductForm';

import { Actions, SubmitButton } from './styles';

interface EditProductModalProps {
  isVisible: boolean;
  productId: string;
  onClose: () => void;
  onUpdate: (product: Product) => void;
}

export function EditProductModal({
  isVisible,
  productId,
  onClose,
  onUpdate,
}: EditProductModalProps) {
  const [product, setProduct] = useState<Product>({} as Product);
  const [isSubmittingSuccessful, setIsSubmittingSuccessful] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getProduct() {
      try {
        const product = await ProductsService.getProductById(
          productId,
          controller.signal,
        );

        const imageUrl = new URL(product.imagePath);

        const imagePath = imageUrl.pathname.slice(1);

        setProduct(product);
        setFileName(imagePath);
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Produto não encontrado!');
      }
    }

    getProduct();

    return () => controller.abort();
  }, [productId]);

  useEffect(() => {
    async function uploadImage() {
      if (isSubmittingSuccessful && fileToUpload !== null) {
        const { signedUrl } = await UploadService.getSignedUrl(fileName);

        await UploadService.uploadFile(
          signedUrl,
          fileToUpload,
          fileToUpload.type,
        );

        toast.success('Produto atualizado com sucesso!');
        onClose();
      }
    }

    uploadImage();
  }, [isSubmittingSuccessful, fileName, fileToUpload, onClose]);

  async function handleSubmit(data: ProductFormData) {
    try {
      let shouldCloseModal = true;
      let imagePath = fileName;

      if (data.image) {
        const { name: originalFileName } = data.image;

        imagePath = `${Date.now()}-${originalFileName}`;

        setFileName(imagePath);
        setFileToUpload(data.image);

        shouldCloseModal = false;
      }

      const updatedProduct = await ProductsService.updateProduct(product.id, {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        imagePath: imagePath,
        categoryId: data.categoryId,
        ingredients: data.ingredients,
      });

      setIsSubmittingSuccessful(true);
      onUpdate(updatedProduct);

      if (shouldCloseModal) {
        toast.success('Produto atualizado com sucesso!');
        onClose();
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }

      toast.error('Ocorreu um erro ao editar o produto!');
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title="Editar Produto"
      containerId="product-modal"
    >
      <ProductForm onSubmit={handleSubmit} product={product}>
        <Actions>
          <Button type="button" $variant="secondary">
            Excluir Produto
          </Button>

          <SubmitButton type="submit">Salvar Alterações</SubmitButton>
        </Actions>
      </ProductForm>
    </Modal>
  );
}
