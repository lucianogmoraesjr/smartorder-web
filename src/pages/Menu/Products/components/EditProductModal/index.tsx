import { CanceledError } from 'axios';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { Product } from '@/@types/Product';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useSafeAsyncAction } from '@/hooks/useSafeAsyncAction';
import ProductsService from '@/services/ProductsService';

import { ProductForm, ProductFormHandle } from '../ProductForm';

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
  const productFormRef = useRef<ProductFormHandle>(null);

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    const controller = new AbortController();

    async function getProduct() {
      try {
        const product = await ProductsService.getProductById(
          productId,
          controller.signal,
        );

        safeAsyncAction(() => {
          productFormRef.current?.setFieldsValues(product);
        });
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Produto não encontrado!');
      }
    }

    getProduct();

    return () => controller.abort();
  }, [productId, safeAsyncAction]);

  async function handleSubmit(data: FormData) {
    try {
      const updatedProduct = await ProductsService.updateProduct(
        productId,
        data,
      );

      onUpdate(updatedProduct);

      onClose();
      toast.success('Produto atualizado com sucesso!');
    } catch {
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
      <ProductForm onSubmit={handleSubmit} ref={productFormRef}>
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
