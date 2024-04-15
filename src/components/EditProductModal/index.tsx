import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { useSafeAsyncAction } from '../../hooks/useSafeAsyncAction';
import ProductsService from '../../services/ProductsService';
import { Button } from '../Button';
import { Modal } from '../Modal';
import { ProductForm, ProductFormHandle } from '../ProductForm';

import { Actions, SubmitButton } from './styles';

interface EditProductModalProps {
  isVisible: boolean;
  productId: string;
  onClose: () => void;
}

export function EditProductModal({
  isVisible,
  productId,
  onClose,
}: EditProductModalProps) {
  const productFormRef = useRef<ProductFormHandle>(null);

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    async function getProduct() {
      try {
        const product = await ProductsService.getProductById(productId);

        safeAsyncAction(() => {
          productFormRef.current?.setFieldsValues(product);
        });
      } catch {
        toast.error('Produto não encontrado!');
      }
    }

    getProduct();
  }, [productId, safeAsyncAction]);

  async function handleSubmit() {
    //
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
