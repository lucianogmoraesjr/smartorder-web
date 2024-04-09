import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Category } from '../../@types/Category';
import CategoriesService from '../../services/CategoriesService';
import { Button } from '../Button';
import { Input } from '../Input';
import { Modal } from '../Modal';

import { EditCategoryForm } from './styles';

interface EditCategoryModalProps {
  isVisible: boolean;
  category: Category;
  onClose: () => void;
  onUpdate: (category: Category) => void;
  onDelete: (category: Category) => void;
}

export function EditCategoryModal({
  isVisible,
  category,
  onClose,
  onUpdate,
  onDelete,
}: EditCategoryModalProps) {
  const [emoji, setEmoji] = useState('');
  const [name, setName] = useState('');

  useEffect(() => {
    if (!category) {
      return;
    }

    setEmoji(category.emoji);
    setName(category.name);
  }, [category]);

  function handleOpenDeleteModal() {
    onDelete(category);
    onClose();
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const { data } = await CategoriesService.updateCategory(category.id, {
        name,
        emoji,
      });

      onUpdate(data);

      onClose();
      toast.success('Categoria atualizada com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao editar a categoria!');
    }
  }

  if (!category) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} title="Editar Categoria" onClose={onClose}>
      <EditCategoryForm onSubmit={handleSubmit}>
        <Input
          name="emoji"
          label="Emoji"
          value={emoji}
          onChange={e => setEmoji(e.target.value)}
        />

        <Input
          name="name"
          label="Nome da categoria"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <div className="actions">
          <Button
            $variant="secondary"
            type="button"
            onClick={handleOpenDeleteModal}
          >
            Excluir Categoria
          </Button>

          <Button type="submit">Salvar alterações</Button>
        </div>
      </EditCategoryForm>
    </Modal>
  );
}
