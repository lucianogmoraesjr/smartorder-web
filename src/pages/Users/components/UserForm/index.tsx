import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

import { Input } from '../../../../components/Input';
import { InputGroup } from '../../../../components/InputGroup';

import { Form, RadioContainer, RadioGroup, RadioItem } from './styles';

const registerUserFormSchema = z.object({
  name: z.string().min(3, 'O nome deve conter pelo menos 3 caracteres'),
  email: z.string().email('E-mail inválido'),
  password: z.string().min(8, 'A senha deve conter pelo menos 8 caracteres'),
  role: z.enum(['WAITER', 'ADMIN'], {
    invalid_type_error: 'Selecione um tipo de cargo',
  }),
});

type RegisterUserFormData = z.infer<typeof registerUserFormSchema>;

interface UserFormProps {
  children: ReactNode;
  defaultValues?: Omit<RegisterUserFormData, 'password'>;
  onSubmit: (data: RegisterUserFormData) => Promise<void>;
}

export function UserForm({ children, defaultValues, onSubmit }: UserFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RegisterUserFormData>({
    resolver: zodResolver(registerUserFormSchema),
    defaultValues,
  });

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <InputGroup error={errors.name?.message}>
        <Input
          label="Nome"
          placeholder="Fulano de tal"
          error={errors.name?.message}
          {...register('name')}
        />
      </InputGroup>

      <InputGroup error={errors.email?.message}>
        <Input
          label="E-mail"
          placeholder="fulano@mail.com"
          error={errors.email?.message}
          {...register('email')}
        />
      </InputGroup>

      <InputGroup error={errors.password?.message}>
        <Input
          label="Senha"
          placeholder="********"
          type="password"
          error={errors.password?.message}
          {...register('password')}
        />
      </InputGroup>

      <RadioContainer>
        <span>Tipo</span>

        <RadioGroup>
          <RadioItem>
            <input
              type="radio"
              id="admin"
              value="ADMIN"
              {...register('role')}
            />
            <label htmlFor="admin">Admin</label>
          </RadioItem>

          <RadioItem>
            <input
              type="radio"
              id="waiter"
              value="WAITER"
              {...register('role')}
            />
            <label htmlFor="waiter">Garçom</label>
          </RadioItem>
        </RadioGroup>

        <span>{errors.role?.message}</span>
      </RadioContainer>

      {children}
    </Form>
  );
}
