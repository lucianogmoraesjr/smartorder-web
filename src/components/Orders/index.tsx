import { useOrders } from '../../hooks/useOrders';
import { OrdersBoard } from '../OrdersBoard';

import { Container } from './styles';

export function Orders() {
  const { orders } = useOrders();

  const waiting = orders.filter(order => order.status === 'WAITING');
  const production = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');

  return (
    <Container>
      <OrdersBoard title="Fila de espera" icon="🕒" orders={waiting} />

      <OrdersBoard title="Em produção" icon="👨🏼‍🍳" orders={production} />

      <OrdersBoard title="Pronto" icon="✅" orders={done} />
    </Container>
  );
}
