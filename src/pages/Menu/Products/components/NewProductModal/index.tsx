import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Product } from '@/@types/Product';
import { Modal } from '@/components/Modal';
import ProductsService from '@/services/ProductsService';
import UploadService from '@/services/UploadService';

import { ProductForm } from '../ProductForm';
import { ProductFormData } from '../ProductForm/useProductForm';

import { SubmitButton } from './styles';

interface NewProductModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNewProduct: (product: Product) => void;
}

export function NewProductModal({
  isVisible,
  onClose,
  onNewProduct,
}: NewProductModalProps) {
  const [isSubmittingSuccessful, setIsSubmittingSuccessful] = useState(false);
  const [fileName, setFileName] = useState('');
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);

  useEffect(() => {
    async function uploadImage() {
      if (isSubmittingSuccessful && fileToUpload !== null) {
        const { signedUrl } = await UploadService.getSignedUrl(fileName);

        await UploadService.uploadFile(
          signedUrl,
          fileToUpload,
          fileToUpload.type,
        );

        toast.success('Produto cadastrado com sucesso!');
        onClose();
      }
    }

    uploadImage();
  }, [isSubmittingSuccessful, fileName, fileToUpload, onClose]);

  async function handleSubmit(data: ProductFormData) {
    try {
      if (!data.image) return;

      const { name: originalFileName } = data.image;

      const generatedUniqueFileName = `${Date.now()}-${originalFileName}`;

      setFileName(generatedUniqueFileName);

      setFileToUpload(data.image);

      const newProduct = await ProductsService.createProduct({
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        imagePath: generatedUniqueFileName,
        categoryId: data.categoryId,
        ingredients: data.ingredients,
      });

      setIsSubmittingSuccessful(true);
      onNewProduct(newProduct);
    } catch (error) {
      if (error instanceof AxiosError) {
        toast.error(error.response?.data.message);
        return;
      }

      toast.error('Ocorreu um erro ao cadastrar o produto!');
    }
  }

  return (
    <Modal title="Novo Produto" isVisible={isVisible} onClose={onClose}>
      <ProductForm onSubmit={handleSubmit}>
        <SubmitButton type="submit">Salvar Alterações</SubmitButton>
      </ProductForm>
    </Modal>
  );
}
