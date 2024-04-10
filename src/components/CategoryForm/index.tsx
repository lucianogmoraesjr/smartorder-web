import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { z } from 'zod';

import { Category, CategoryRequestBody } from '../../@types/Category';
import { useErrors } from '../../hooks/useErrors';
import { FormGroup } from '../FormGroup';
import { Input } from '../Input';

import { Form } from './styles';

interface CategoryFormProps {
  onSubmit(category: CategoryRequestBody): Promise<void>;
  children: ReactNode;
}

export interface CategoryFormHandle {
  setFieldsValues: (category: Category) => void;
}

export const CategoryForm = forwardRef<CategoryFormHandle, CategoryFormProps>(
  ({ children, onSubmit }, ref) => {
    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState('');

    useImperativeHandle(ref, () => ({
      setFieldsValues: (category: Category) => {
        setEmoji(category.emoji ?? '');
        setName(category.name ?? '');
      },
    }));

    const { setError, removeError, getErrorMessageByFieldName } = useErrors();

    const categoryFormSchema = z.object({
      emoji: z
        .string()
        .trim()
        .min(1, 'Emoji é obrigatório')
        .emoji('Emoji inválido'),
      name: z.string().trim().min(1, 'Nome é obrigatório'),
    });

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

      const result = categoryFormSchema.safeParse({
        name,
        emoji,
      });

      if (!result.success) {
        result.error.errors.forEach(error => {
          setError({
            field: String(error.path[0]),
            message: error.message,
          });
        });

        return;
      } else {
        onSubmit(result.data);
      }
    }

    return (
      <Form onSubmit={handleSubmit}>
        <FormGroup error={getErrorMessageByFieldName('emoji')}>
          <Input
            name="emoji"
            label="Emoji"
            value={emoji}
            onChange={handleEmojiChange}
            error={getErrorMessageByFieldName('emoji')}
            placeholder="Ex: 🍕"
          />
        </FormGroup>

        <FormGroup error={getErrorMessageByFieldName('name')}>
          <Input
            name="name"
            label="Nome da categoria"
            value={name}
            onChange={handleNameChange}
            error={getErrorMessageByFieldName('name')}
            placeholder="Ex: Lanches"
          />
        </FormGroup>

        {children}
      </Form>
    );
  },
);
