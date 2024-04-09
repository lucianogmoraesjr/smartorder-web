import {
  FormEvent,
  ReactNode,
  Ref,
  forwardRef,
  useImperativeHandle,
  useState,
} from 'react';

import { Category, CategoryRequestBody } from '../../@types/Category';
import { Input } from '../Input';

import { Form } from './styles';

interface CategoryFormProps {
  onSubmit(category: CategoryRequestBody): Promise<void>;
  children: ReactNode;
}

export interface CategoryFormRef {
  setFieldsValues: (category: Category) => void;
}

export const CategoryForm = forwardRef(
  ({ children, onSubmit }: CategoryFormProps, ref: Ref<CategoryFormRef>) => {
    const [emoji, setEmoji] = useState('');
    const [name, setName] = useState('');

    useImperativeHandle(ref, () => ({
      setFieldsValues: (category: Category) => {
        setEmoji(category.emoji ?? '');
        setName(category.name ?? '');
      },
    }));

    async function handleSubmit(event: FormEvent) {
      event.preventDefault();

      onSubmit({
        name,
        emoji,
      });
    }

    return (
      <Form onSubmit={handleSubmit}>
        <Input
          name="emoji"
          label="Emoji"
          value={emoji}
          onChange={e => setEmoji(e.target.value)}
          placeholder="Ex: 🍕"
        />

        <Input
          name="name"
          label="Nome da categoria"
          value={name}
          onChange={e => setName(e.target.value)}
          placeholder="Ex: Lanches"
        />

        {children}
      </Form>
    );
  },
);
