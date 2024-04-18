import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';
import { z } from 'zod';

import { Form } from './styles';

import { Category, CategoryRequestBody } from '@/@types/Category';
import { Input } from '@/components/Input';
import { InputGroup } from '@/components/InputGroup';
import { useErrors } from '@/hooks/useErrors';

interface CategoryFormProps {
  onSubmit(category: CategoryRequestBody): Promise<void>;
  children: ReactNode;
}

export interface CategoryFormHandle {
  setFieldsValues: (category: Category) => void;
}

const categoryFormSchema = z.object({
  emoji: z
    .string()
    .trim()
    .min(1, 'Emoji é obrigatório')
    .emoji('Emoji inválido'),
  name: z.string().trim().min(1, 'Nome é obrigatório'),
});

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
        const error = result.error;

        for (const issue of error.issues) {
          setError({
            field: issue.path[0].toString(),
            message: issue.message,
          });
        }
      } else {
        onSubmit(result.data);
      }
    }

    return (
      <Form onSubmit={handleSubmit}>
        <InputGroup error={getErrorMessageByFieldName('emoji')}>
          <Input
            name="emoji"
            label="Emoji"
            value={emoji}
            onChange={handleEmojiChange}
            error={getErrorMessageByFieldName('emoji')}
            placeholder="Ex: 🍕"
          />
        </InputGroup>

        <InputGroup error={getErrorMessageByFieldName('name')}>
          <Input
            name="name"
            label="Nome da categoria"
            value={name}
            onChange={handleNameChange}
            error={getErrorMessageByFieldName('name')}
            placeholder="Ex: Lanches"
          />
        </InputGroup>

        {children}
      </Form>
    );
  },
);
