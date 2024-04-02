import { Header } from '../../components/Header';
import HomeIcon from '../../components/Icons/HomeIcon';
import { Orders } from '../../components/Orders';

import { Container } from './styles';

export function Home() {
  return (
    <Container>
      <Header
        title="Home"
        subtitle="Acompanhe os pedidos dos clientes"
        icon={HomeIcon}
      />
      <Orders />
    </Container>
  );
}
