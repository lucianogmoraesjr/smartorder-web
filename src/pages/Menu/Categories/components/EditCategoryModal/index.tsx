import { CanceledError } from 'axios';
import { useEffect, useRef } from 'react';
import { toast } from 'react-toastify';

import { Category, CategoryRequestBody } from '@/@types/Category';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import { useSafeAsyncAction } from '@/hooks/useSafeAsyncAction';
import CategoriesService from '@/services/CategoriesService';

import { CategoryForm, CategoryFormHandle } from '../CategoryForm';

import { FormActions } from './styles';

interface EditCategoryModalProps {
  isVisible: boolean;
  categoryId: string;
  onClose: () => void;
  onUpdate: (category: Category) => void;
  onDelete: (categoryId: string) => void;
}

export function EditCategoryModal({
  isVisible,
  categoryId,
  onClose,
  onUpdate,
  onDelete,
}: EditCategoryModalProps) {
  const categoryFormRef = useRef<CategoryFormHandle>(null);

  const safeAsyncAction = useSafeAsyncAction();

  useEffect(() => {
    if (!categoryId) {
      return;
    }

    const controller = new AbortController();

    async function getContact() {
      try {
        const category = await CategoriesService.getCategoryById(
          categoryId,
          controller.signal,
        );

        safeAsyncAction(() => {
          categoryFormRef?.current?.setFieldsValues(category);
        });
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Categoria não encontrada!');
      }
    }

    getContact();

    return () => controller.abort();
  }, [categoryId, safeAsyncAction]);

  function handleOpenDeleteModal() {
    onDelete(categoryId);
    onClose();
  }

  async function handleSubmit(category: CategoryRequestBody) {
    try {
      const { data } = await CategoriesService.updateCategory(
        categoryId,
        category,
      );

      onUpdate(data);

      onClose();
      toast.success('Categoria atualizada com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao editar a categoria!');
    }
  }

  return (
    <Modal isVisible={isVisible} title="Editar Categoria" onClose={onClose}>
      <CategoryForm onSubmit={handleSubmit} ref={categoryFormRef}>
        <FormActions>
          <Button
            $variant="secondary"
            type="button"
            onClick={handleOpenDeleteModal}
          >
            Excluir Categoria
          </Button>

          <Button type="submit">Salvar alterações</Button>
        </FormActions>
      </CategoryForm>
    </Modal>
  );
}
