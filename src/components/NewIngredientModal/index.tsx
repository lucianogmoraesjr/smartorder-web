import { ChangeEvent, FormEvent, useState } from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Ingredient } from '../../@types/Ingredient';
import { useErrors } from '../../hooks/useErrors';
import IngredientsService from '../../services/IngredientsService';
import { Button } from '../Button';
import { Input } from '../Input';
import { InputGroup } from '../InputGroup';
import { Modal } from '../Modal';

import { IngredientForm } from './styles';

interface NewIngredientModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNewIngredient: (ingredient: Ingredient) => void;
}

const ingredientFormSchema = z.object({
  emoji: z
    .string()
    .trim()
    .min(1, 'Emoji é obrigatório')
    .emoji('Emoji inválido'),
  name: z.string().trim().min(1, 'Nome é obrigatório'),
});

export function NewIngredientModal({
  isVisible,
  onClose,
  onNewIngredient,
}: NewIngredientModalProps) {
  const [emoji, setEmoji] = useState('');
  const [name, setName] = useState('');

  const { setError, removeError, getErrorMessageByFieldName } = useErrors();

  function handleEmojiChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) {
      removeError('emoji');
    }

    setEmoji(event.target.value);
  }

  function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
    if (event.target.value) {
      removeError('name');
    }

    setName(event.target.value);
  }

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    const result = ingredientFormSchema.safeParse({
      emoji,
      name,
    });

    if (!result.success) {
      const { issues } = result.error;

      for (const issue of issues) {
        setError({
          field: issue.path[0].toString(),
          message: issue.message,
        });
      }
    } else {
      try {
        const ingredient = await IngredientsService.createIngredient(
          result.data,
        );

        onNewIngredient(ingredient);
        onClose();
        toast.success('Ingrediente cadastrado com sucesso!');
      } catch {
        toast.error('Ocorreu um erro ao cadastrar o ingrediente!');
      }
    }
  }

  return (
    <Modal
      isVisible={isVisible}
      overlay="light"
      title="Novo Ingrediente"
      containerId="ingredient-modal"
      onClose={onClose}
    >
      <IngredientForm onSubmit={handleSubmit}>
        <div>
          <InputGroup error={getErrorMessageByFieldName('emoji')}>
            <Input
              label="Emoji"
              name="emoji"
              placeholder="Ex: 🧀"
              onChange={handleEmojiChange}
              value={emoji}
              error={getErrorMessageByFieldName('emoji')}
            />
          </InputGroup>

          <InputGroup error={getErrorMessageByFieldName('name')}>
            <Input
              label="Nome do Ingredient"
              name="name"
              placeholder="Ex: Mussarela"
              onChange={handleNameChange}
              value={name}
              error={getErrorMessageByFieldName('name')}
            />
          </InputGroup>
        </div>

        <Button>Salvar Alterações</Button>
      </IngredientForm>
    </Modal>
  );
}
