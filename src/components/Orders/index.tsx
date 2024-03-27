import { useEffect, useState } from 'react';
import socketIO from 'socket.io-client';

import { api } from '../../services/api';
import { Order } from '../../types/Order';
import { OrdersBoard } from '../OrdersBoard';

import { Container } from './styles';

export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const io = socketIO('http://localhost:3333', {
      transports: ['websocket'],
    });

    io.on('orders@new', order =>
      setOrders(prevState => prevState.concat(order)),
    );
  }, []);

  useEffect(() => {
    api.get('orders').then(({ data }) => setOrders(data));
  }, []);

  function handleCancelOrder(orderId: string) {
    setOrders(prevState => prevState.filter(order => order._id !== orderId));
  }

  function handleOrderStatusChange(orderId: string, status: Order['status']) {
    setOrders(prevState =>
      prevState.map(order =>
        order._id === orderId ? { ...order, status } : order,
      ),
    );
  }

  const waiting = orders.filter(order => order.status === 'WAITING');
  const production = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');

  return (
    <Container>
      <OrdersBoard
        title="Fila de espera"
        icon="🕒"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        title="Em produção"
        icon="👨🏼‍🍳"
        orders={production}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
      <OrdersBoard
        title="Pronto"
        icon="✅"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onOrderStatusChange={handleOrderStatusChange}
      />
    </Container>
  );
}
