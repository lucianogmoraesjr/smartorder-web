import { useEffect, useState } from 'react';

import { Category } from '../../types/Category';
import { Button } from '../Button';
import { Input } from '../Input';
import { Modal } from '../Modal';

import { EditCategoryForm } from './styles';

interface EditCategoryModalProps {
  isVisible: boolean;
  onClose: () => void;
  category: Category | null;
}

export function EditCategoryModal({
  isVisible,
  onClose,
  category,
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

  if (!category) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} title="Editar Categoria" onClose={onClose}>
      <EditCategoryForm>
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
          <Button $variant="secondary" type="button">
            Excluir Categoria
          </Button>

          <Button type="submit">Salvar alterações</Button>
        </div>
      </EditCategoryForm>
    </Modal>
  );
}
