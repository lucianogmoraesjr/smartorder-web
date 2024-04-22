import { CanceledError } from 'axios';
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
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getProduct() {
      try {
        const product = await ProductsService.getProductById(
          productId,
          controller.signal,
        );

        setProduct(product);
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Produto não encontrado!');
      }
    }

    getProduct();

    return () => controller.abort();
  }, [productId]);

  async function handleSubmit(data: ProductFormData) {
    try {
      if (!product) {
        toast.error('Ocorreu um erro ao editar o produto!');
        return;
      }

      let fileName = product.imagePath;

      if (data.image) {
        const { name: originalFileName, type: contentType } = data.image;

        fileName = `${Date.now()}-${originalFileName}`;

        const { signedUrl } = await UploadService.getSignedUrl(fileName);

        await UploadService.uploadFile(signedUrl, data.image, contentType);
      }

      const updatedProduct = await ProductsService.updateProduct(product.id, {
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        imagePath: fileName,
        categoryId: data.categoryId,
        ingredients: data.ingredients,
      });

      onUpdate(updatedProduct);
      toast.success('Produto atualizado com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao editar o produto!');
    } finally {
      onClose();
    }
  }

  if (!product) {
    return;
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
