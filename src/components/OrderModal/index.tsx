import { Order } from '../../types/Order';
import { formatCurrency } from '../../utils/formatCurrency';

import closeIcon from '../../assets/images/close-icon.svg';

import { Actions, ModalBody, OrderDetails, Overlay } from './styles';
import { useEffect } from 'react';

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
  onCloseModal,
  onCancelOrder,
  isLoading,
  onChangeOrderStatus,
}: OrderModalProps) {
  useEffect(() => {
    function closeModalOnPressEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onCloseModal();
      }
    }

    document.addEventListener('keydown', closeModalOnPressEsc);

    return () => document.removeEventListener('keydown', closeModalOnPressEsc);
  }, [onCloseModal]);

  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((acc, { product, quantity }) => {
    acc += product.price * quantity;

    return acc;
  }, 0);

  return (
    <Overlay onClick={onCloseModal}>
      <ModalBody onClick={e => e.stopPropagation()}>
        <header>
          <strong>Mesa {order.table}</strong>

          <button type="button" onClick={onCloseModal}>
            <img src={closeIcon} alt="Fechar" />
          </button>
        </header>

        <div className="status-container">
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
        </div>

        <OrderDetails>
          <strong>Itens</strong>

          <div className="order-items">
            {order.products.map(({ _id, product, quantity }) => (
              <div key={_id} className="item">
                <img
                  src={`http://localhost:3333/tmp/${product.imagePath}`}
                  alt={product.name}
                  width={56}
                  height={28.51}
                />

                <span className="quantity">{quantity}x</span>

                <div className="product-details">
                  <strong>{product.name}</strong>
                  <span>{formatCurrency(product.price)}</span>
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
          {order.status !== 'DONE' && (
            <button
              type="button"
              className="primary"
              onClick={onChangeOrderStatus}
              disabled={isLoading}
            >
              <span>
                {order.status === 'WAITING' && '👨🏼‍🍳'}
                {order.status === 'IN_PRODUCTION' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Iniciar produção'}
                {order.status === 'IN_PRODUCTION' && 'Concluir pedido'}
              </strong>
            </button>
          )}

          <button
            type="button"
            className="cancel"
            onClick={onCancelOrder}
            disabled={isLoading}
          >
            Cancelar pedido
          </button>
        </Actions>
      </ModalBody>
    </Overlay>
  );
}