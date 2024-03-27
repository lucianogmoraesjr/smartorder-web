import homeIcon from '../../assets/images/home-icon.svg';

import { Container, Content, Title } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <Title>
            <img src={homeIcon} alt="Ícone de casa" />
            <h1>Home</h1>
          </Title>

          <h2>Acompanhe os pedidos dos clientes</h2>
        </div>
      </Content>
    </Container>
  );
}
