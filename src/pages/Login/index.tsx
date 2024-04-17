import { Button } from '../../components/Button';
import { Input } from '../../components/Input';

import { Container, LoginForm, WelcomeContainer } from './styles';

export function Login() {
  return (
    <Container>
      <WelcomeContainer>
        <span>Bem vindo(a) ao</span>
        <div>
          <strong>SMART</strong>
          <strong>ORDER</strong>
        </div>
      </WelcomeContainer>

      <LoginForm>
        <Input label="E-mail" name="email" placeholder="Seu e-mail de acesso" />

        <Input label="Senha" name="password" placeholder="Informe sua senha" />

        <Button type="submit">Fazer Login</Button>
      </LoginForm>
    </Container>
  );
}
