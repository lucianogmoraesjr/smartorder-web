import { Modal } from '../Modal';
import { SubmitButton } from '../NewCategoryModal/styles';
import { ProductForm } from '../ProductForm';

interface NewProductModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export function NewProductModal({ isVisible, onClose }: NewProductModalProps) {
  async function handleSubmit() {
    //
  }

  return (
    <Modal title="Novo Produto" isVisible={isVisible} onClose={onClose}>
      <ProductForm onSubmit={handleSubmit}>
        <SubmitButton type="submit">Salvar Alterações</SubmitButton>
      </ProductForm>
    </Modal>
  );
}
