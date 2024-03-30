import { useState } from 'react';
import { toast } from 'react-toastify';

import { api } from '../../services/api';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';

import { Board, OrdersContainer } from './styles';

interface OrdersBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onOrderStatusChange: (orderId: string, status: Order['status']) => void;
}

export function OrdersBoard({
  title,
  icon,
  orders,
  onCancelOrder,
  onOrderStatusChange,
}: OrdersBoardProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  function handleOpenModal(order: Order) {
    setIsModalVisible(true);
    setSelectedOrder(order);
  }

  function handleCloseModal() {
    setIsModalVisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    if (!selectedOrder) {
      return;
    }

    setIsLoading(true);

    const status =
      selectedOrder.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`orders/${selectedOrder.id}`, { status });

    toast.success(
      `Status da mesa ${selectedOrder.table} alterado com sucesso.`,
    );
    onOrderStatusChange(selectedOrder.id, status);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  async function handleCancelOrder() {
    if (!selectedOrder) {
      return;
    }

    setIsLoading(true);

    await api.delete(`orders/${selectedOrder.id}`);

    toast.success(`O pedido da mesa ${selectedOrder.table} foi cancelado!`);
    onCancelOrder(selectedOrder.id);
    setIsLoading(false);
    setIsModalVisible(false);
  }

  return (
    <Board>
      <OrderModal
        visible={isModalVisible}
        order={selectedOrder}
        isLoading={isLoading}
        onCloseModal={handleCloseModal}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>(1)</span>
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
