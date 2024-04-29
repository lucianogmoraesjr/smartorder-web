import { CanceledError } from 'axios';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { Order } from '@/@types/Order';
import { Button } from '@/components/Button';
import { Modal } from '@/components/Modal';
import OrdersService from '@/services/OrdersService';
import { currencyFormatter } from '@/utils/currencyFormatter';

import { OrderCreatedAt, OrderDetails } from './styles';

interface ArchivedOrderModal {
  isVisible: boolean;
  orderId: string;
  onClose: () => void;
  onOpenDeleteModal: (orderId: string) => void;
}

export function ArchivedOrderModal({
  isVisible,
  orderId,
  onClose,
  onOpenDeleteModal,
}: ArchivedOrderModal) {
  const [archivedOrder, setArchivedOrder] = useState<Order>({} as Order);

  useEffect(() => {
    const controller = new AbortController();

    async function getArchivedOrder() {
      try {
        const { data } = await OrdersService.getOrderById(
          orderId,
          controller.signal,
        );

        setArchivedOrder(data);
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Ocorreu um erro ao buscar o registro!');
      }
    }

    getArchivedOrder();

    return () => controller.abort();
  }, [orderId]);

  const totalInCents = useMemo(() => {
    const total = archivedOrder.products?.reduce(
      (acc, { product, quantity }) => (acc += product.priceInCents * quantity),
      0,
    );

    return total;
  }, [archivedOrder.products]);

  const { format } = currencyFormatter();

  function handleOpenDeleteModal() {
    onOpenDeleteModal(archivedOrder.id);
    onClose();
  }

  return (
    <Modal isVisible={isVisible} title={`Mesa teste`} onClose={onClose}>
      <OrderCreatedAt>
        <small>Status do Pedido</small>
        <span>
          {archivedOrder.createdAt &&
            new Intl.DateTimeFormat('pt-BR').format(
              new Date(archivedOrder.createdAt),
            )}
        </span>
      </OrderCreatedAt>

      <OrderDetails>
        <strong>Itens</strong>

        <div className="order-items">
          {archivedOrder.products?.map(({ product, quantity }) => (
            <div key={product.id} className="item">
              <img
                src={product.imagePath}
                alt={product.name}
                width={56}
                height={28.51}
              />

              <span className="quantity">{quantity}x</span>

              <div className="product-details">
                <strong>{product.name}</strong>
                <span>{format(product.priceInCents)}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="total">
          <span>Total</span>
          <strong>{format(totalInCents)}</strong>
        </div>
      </OrderDetails>

      <Button
        $variant="secondary"
        type="button"
        onClick={handleOpenDeleteModal}
      >
        Excluir Registro
      </Button>
    </Modal>
  );
}
