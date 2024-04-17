import { FormEvent, useState } from 'react';

import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { useAuth } from '../../hooks/useAuth';

import { Container, LoginForm, WelcomeContainer } from './styles';

export function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useAuth();

  async function handleSubmit(event: FormEvent) {
    event.preventDefault();

    await signIn({
      email,
      password,
    });
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

      <LoginForm onSubmit={handleSubmit}>
        <Input
          label="E-mail"
          name="email"
          placeholder="Seu e-mail de acesso"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />

        <Input
          label="Senha"
          name="password"
          placeholder="Informe sua senha"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        <Button type="submit">Fazer Login</Button>
      </LoginForm>
    </Container>
  );
}
