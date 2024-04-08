import { useState } from 'react';

import { Order } from '../../@types/Order';
import { OrderModal } from '../OrderModal';
import { QuantityBadge } from '../QuantityBadge';

import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
}

export function OrdersBoard({ title, icon, orders }: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        onCloseModal={handleCloseModal}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <QuantityBadge>{orders.length}</QuantityBadge>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map(order => (
            <button
              key={order.id}
              type="button"
              onClick={() => handleOpenModal(order)}
            >
              <strong>Mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}
        </OrdersContainer>
      )}
    </Board>
  );
}
