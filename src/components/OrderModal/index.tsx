import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';
import { Modal } from '../Modal';

import { Actions, OrderDetails, StatusContainer } from './styles';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  isLoading: boolean;
  onCloseModal: () => void;
  onCancelOrder: () => void;
  onChangeOrderStatus: () => void;
}

export function OrderModal({
  visible,
  order,
  isLoading,
  onCloseModal,
  onCancelOrder,
  onChangeOrderStatus,
}: OrderModalProps) {
  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((acc, { product, quantity }) => {
    acc += (product.priceInCents * quantity) / 100;

    return acc;
  }, 0);

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
            {order.status === 'WAITING' && '🕒'}
            {order.status === 'IN_PRODUCTION' && '👨🏼‍🍳'}
            {order.status === 'DONE' && '✅'}
          </span>
          <strong>
            {order.status === 'WAITING' && 'Fila de espera'}
            {order.status === 'IN_PRODUCTION' && 'Em produção'}
            {order.status === 'DONE' && 'Pronto'}
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
                <span>{formatCurrency(product.priceInCents / 100)}</span>
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
          onClick={onCancelOrder}
          disabled={isLoading}
        >
          Cancelar pedido
        </button>

        {order.status !== 'DONE' && (
          <button
            type="button"
            className="primary"
            onClick={onChangeOrderStatus}
            disabled={isLoading}
          >
            <strong>
              {order.status === 'WAITING' && 'Iniciar produção'}
              {order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
            </strong>
          </button>
        )}
      </Actions>
    </Modal>
  );
}
