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
  async function handleSubmit(data: ProductFormData) {
    try {
      let fileName = '';

      if (data.image) {
        const { name: originalFileName, type: contentType } = data.image;

        fileName = `${Date.now()}-${originalFileName}`;

        const { signedUrl } = await UploadService.getSignedUrl(fileName);

        await UploadService.uploadFile(signedUrl, data.image, contentType);
      }

      const newProduct = await ProductsService.createProduct({
        name: data.name,
        description: data.description,
        priceInCents: data.priceInCents,
        imagePath: fileName,
        categoryId: data.categoryId,
        ingredients: data.ingredients,
      });

      onNewProduct(newProduct);
      toast.success('Produto cadastrado com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao cadastrar o produto!');
    } finally {
      onClose();
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
