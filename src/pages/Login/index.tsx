import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { InputGroup } from '../../components/InputGroup';
import { useAuth } from '../../hooks/useAuth';

import { Container, LoginForm, WelcomeContainer } from './styles';

const loginFormSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Senha é obrigatório'),
});

type LoginFormData = z.infer<typeof loginFormSchema>;

export function Login() {
  const { signIn } = useAuth();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginFormSchema),
  });

  async function handleSignIn(data: LoginFormData) {
    try {
      await signIn(data);
    } catch {
      toast.error('E-mail ou senha inválidos');
    }
  }

  return (
    <Container>
      <WelcomeContainer>
        <span>Bem vindo(a) ao</span>
        <div>
          <strong>SMART</strong>
          <strong>ORDER</strong>
        </div>
      </WelcomeContainer>

      <LoginForm onSubmit={handleSubmit(handleSignIn)}>
        <InputGroup error={errors.email?.message}>
          <Input
            label="E-mail"
            placeholder="Seu e-mail de acesso"
            error={errors.email?.message}
            {...register('email')}
          />
        </InputGroup>

        <InputGroup error={errors.password?.message}>
          <Input
            label="Senha"
            placeholder="Informe sua senha"
            type="password"
            error={errors.password?.message}
            {...register('password')}
          />
        </InputGroup>

        <Button type="submit">Fazer Login</Button>
      </LoginForm>
    </Container>
  );
}
