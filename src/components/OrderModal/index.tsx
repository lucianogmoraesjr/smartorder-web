import { useState } from 'react';
import { toast } from 'react-toastify';

import { Order } from '../../@types/Order';
import { useOrders } from '../../hooks/useOrders';
import { api } from '../../services/api';
import { formatCurrency } from '../../utils/formatCurrency';
import { Modal } from '../Modal';

import { Actions, OrderDetails, StatusContainer } from './styles';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onCloseModal: () => void;
}

export function OrderModal({ visible, order, onCloseModal }: OrderModalProps) {
  const [isLoading, setIsLoading] = useState(false);

  const { handleUpdateOrderStatus, handleCancelOrder: cancelOrder } =
    useOrders();

  if (!order) {
    return null;
  }

  async function handleChangeOrderStatus() {
    if (!order) {
      return;
    }

    setIsLoading(true);

    const status = order.status === 'WAITING' ? 'IN_PRODUCTION' : 'DONE';

    await api.patch(`orders/${order.id}`, { status });

    toast.success(`Status da mesa ${order.table} alterado com sucesso.`);
    handleUpdateOrderStatus(order.id, status);
    setIsLoading(false);
    onCloseModal();
  }

  async function handleCancelOrder() {
    if (!order) {
      return;
    }

    setIsLoading(true);

    await api.delete(`orders/${order.id}`);

    toast.success(`O pedido da mesa ${order.table} foi cancelado!`);
    cancelOrder(order.id);
    setIsLoading(false);
    onCloseModal();
  }

  const total = order.products.reduce((acc, { product, quantity }) => {
    acc += (product.priceInCents * quantity) / 100;

    return acc;
  }, 0);

  const ordersWaiting = order.status === 'WAITING';
  const ordersInProduction = order.status === 'IN_PRODUCTION';
  const ordersDone = order.status === 'DONE';
  const ordersDifferentThanDone = order.status !== 'DONE';

  return (
    <Modal
      isVisible={visible}
      title={`Mesa ${order.table}`}
      onClose={onCloseModal}
    >
      <StatusContainer>
        <small>Status do Pedido</small>
        <div>
          <span>
            {ordersWaiting && '🕒'}
            {ordersInProduction && '👨🏼‍🍳'}
            {ordersDone && '✅'}
          </span>
          <strong>
            {ordersWaiting && 'Fila de espera'}
            {ordersInProduction && 'Em produção'}
            {ordersDone && 'Pronto'}
          </strong>
        </div>
      </StatusContainer>

      <OrderDetails>
        <strong>Itens</strong>

        <div className="order-items">
          {order.products.map(({ product, quantity }) => (
            <div key={product.id} className="item">
              <img
                src={`http://localhost:3333/tmp/${product.imagePath}`}
                alt={product.name}
                width={56}
                height={28.51}
              />

              <span className="quantity">{quantity}x</span>

              <div className="product-details">
                <strong>{product.name}</strong>
                <span>{formatCurrency(product.priceInCents)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="total">
          <span>Total</span>
          <strong>{formatCurrency(total)}</strong>
        </div>
      </OrderDetails>

      <Actions>
        <button
          type="button"
          className="cancel"
          onClick={handleCancelOrder}
          disabled={isLoading}
        >
          Cancelar pedido
        </button>

        {ordersDifferentThanDone && (
          <button
            type="button"
            className="primary"
            onClick={handleChangeOrderStatus}
            disabled={isLoading}
          >
            <strong>
              {ordersWaiting && 'Iniciar produção'}
              {ordersInProduction && 'Concluir pedido'}
            </strong>
          </button>
        )}
      </Actions>
    </Modal>
  );
}
