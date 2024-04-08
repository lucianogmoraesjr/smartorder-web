import { Header } from '../../components/Header';
import HomeIcon from '../../components/Icons/HomeIcon';
import { Orders } from '../../components/Orders';
import { OrdersProvider } from '../../contexts/OrdersContext';

import { Container } from './styles';

export function Home() {
  return (
    <OrdersProvider>
      <Container>
        <Header
          title="Home"
          subtitle="Acompanhe os pedidos dos clientes"
          icon={HomeIcon}
        />

        <Orders />
      </Container>
    </OrdersProvider>
  );
}
