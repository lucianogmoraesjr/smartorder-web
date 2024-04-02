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
  if (!category) {
    return null;
  }

  return (
    <Modal isVisible={isVisible} title="Editar Categoria" onClose={onClose}>
      <EditCategoryForm>
        <Input name="emoji" label="Emoji" defaultValue={category.emoji} />

        <Input
          name="name"
          label="Nome da categoria"
          defaultValue={category.name}
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
