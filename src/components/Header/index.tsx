import HomeIcon from '../Icons/HomeIcon';

import { Container, Content, Title } from './styles';

export function Header() {
  return (
    <Container>
      <Content>
        <div className="page-details">
          <Title>
            <HomeIcon />
            <h1>Home</h1>
          </Title>

          <h2>Acompanhe os pedidos dos clientes</h2>
        </div>
      </Content>
    </Container>
  );
}
