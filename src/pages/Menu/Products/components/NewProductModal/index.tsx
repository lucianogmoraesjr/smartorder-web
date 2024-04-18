import { toast } from 'react-toastify';

import { Product } from '@/@types/Product';
import { Modal } from '@/components/Modal';
import ProductsService from '@/services/ProductsService';

import { ProductForm } from '../ProductForm';

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
  async function handleSubmit(data: FormData) {
    try {
      const product = await ProductsService.createProduct(data);

      onNewProduct(product);
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
