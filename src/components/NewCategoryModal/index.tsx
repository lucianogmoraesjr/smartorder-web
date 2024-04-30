import { FormEvent, useState } from 'react';
import { toast } from 'react-toastify';

import { Category } from '../../@types/Category';
import { api } from '../../services/api';
import { Button } from '../Button';
import { Input } from '../Input';
import { Modal } from '../Modal';

import { NewCategoryForm } from './styles';

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
  const [emoji, setEmoji] = useState('');
  const [name, setName] = useState('');

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    try {
      const { data } = await api.post('categories', {
        emoji,
        name,
      });

      onNewCategory(data);
      toast.success('Categoria cadastrada com sucesso.');
    } catch (error) {
      toast.error('Ocorreu um erro ao cadastrar a categoria.');
    } finally {
      setEmoji('');
      setName('');
      onClose();
    }
  }

  return (
    <Modal title="Nova Categoria" isVisible={isVisible} onClose={onClose}>
      <NewCategoryForm onSubmit={handleSubmit}>
        <Input
          name="emoji"
          label="Emoji"
          placeholder="Ex: 🍕"
          value={emoji}
          onChange={e => setEmoji(e.target.value)}
        />

        <Input
          name="name"
          label="Nome da categoria"
          placeholder="Ex: Lanches"
          value={name}
          onChange={e => setName(e.target.value)}
        />

        <Button type="submit">Salvar alterações</Button>
      </NewCategoryForm>
    </Modal>
  );
}
