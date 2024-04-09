import { toast } from 'react-toastify';

import { Category, CategoryRequestBody } from '../../@types/Category';
import CategoriesService from '../../services/CategoriesService';
import { CategoryForm } from '../CategoryForm';
import { Modal } from '../Modal';

import { SubmitButton } from './styles';

interface NewCategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNewCategory: (category: Category) => void;
}

export function NewCategoryModal({
  isVisible,
  onClose,
  onNewCategory,
}: NewCategoryModalProps) {
  async function handleSubmit(category: CategoryRequestBody) {
    try {
      const { data } = await CategoriesService.createCategory(category);

      onNewCategory(data);
      toast.success('Categoria cadastrada com sucesso.');
    } catch {
      toast.error('Ocorreu um erro ao cadastrar a categoria.');
    } finally {
      onClose();
    }
  }

  return (
    <Modal title="Nova Categoria" isVisible={isVisible} onClose={onClose}>
      <CategoryForm onSubmit={handleSubmit}>
        <SubmitButton type="submit">Salvar alterações</SubmitButton>
      </CategoryForm>
    </Modal>
  );
}
