import { useState } from 'react';

import { Button } from '@/components/Button';
import RefreshIcon from '@/components/Icons/RefreshIcon';
import { Modal } from '@/components/Modal';
import { useOrders } from '@/hooks/useOrders';
import OrdersService from '@/services/OrdersService';

import { Header } from '../../components/Header';
import HomeIcon from '../../components/Icons/HomeIcon';
import { Orders } from '../../components/Orders';

import { Container, ModalActions, ModalBody } from './styles';

export function Home() {
  const [isArchiveAllModalOpen, setIsArchiveAllModalOpen] = useState(false);

  const { orders, handleArchiveAll: onArchiveAll } = useOrders();

  function handleOpenArchiveModal() {
    setIsArchiveAllModalOpen(true);
  }

  function handleCloseArchiveModal() {
    setIsArchiveAllModalOpen(false);
  }

  async function handleArchiveAll() {
    const ordersToArchive = orders.map(order => order.id);

    await OrdersService.archiveAll(ordersToArchive);

    onArchiveAll();
    handleCloseArchiveModal();
  }

  return (
    <>
      <Container>
        <Header
          title="Home"
          subtitle="Acompanhe os pedidos dos clientes"
          icon={HomeIcon}
        >
          <Button $variant="secondary" onClick={handleOpenArchiveModal}>
            <RefreshIcon />
            Reiniciar o dia
          </Button>
        </Header>

        <Orders />
      </Container>

      <Modal
        isVisible={isArchiveAllModalOpen}
        icon={RefreshIcon}
        title="Reiniciar o dia"
        onClose={handleCloseArchiveModal}
        containerId="archive-recent"
      >
        <ModalBody>
          <p>
            Ao reiniciar o dia, todos os pedidos serão arquivados no status
            atual.
          </p>
          <p>Deseja reiniciar o dia?</p>
        </ModalBody>

        <ModalActions>
          <Button
            type="button"
            $variant="secondary"
            onClick={handleCloseArchiveModal}
          >
            Não, continuar pedidos
          </Button>

          <Button type="button" onClick={handleArchiveAll}>
            Sim, reiniciar o dia
          </Button>
        </ModalActions>
      </Modal>
    </>
  );
}
