import { CanceledError } from 'axios';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';

import { DeleteModal } from '@/components/DeleteModal';
import { Header } from '@/components/Header';
import EyeIcon from '@/components/Icons/EyeIcon';
import HistoryIcon from '@/components/Icons/HistoryIcon';
import TrashIcon from '@/components/Icons/TrashIcon';
import { Table } from '@/components/Table';
import { TableHeader } from '@/components/Table/TableHeader';
import { useOrders } from '@/hooks/useOrders';
import HistoryService from '@/services/HistoryService';
import OrdersService from '@/services/OrdersService';
import { currencyFormatter } from '@/utils/currencyFormatter';

import { ArchivedOrderModal } from './components/ArchivedOrderModal';
import { Container } from './styles';

interface ArchivedOrder {
  id: string;
  table: number;
  createdAt: Date;
  products: Array<{
    quantity: number;
    product: {
      name: string;
      priceInCents: number;
      category: {
        emoji: string;
        name: string;
      };
    };
  }>;
}

export function History() {
  const [archivedOrders, setArchivedOrders] = useState<ArchivedOrder[]>([]);
  const [selectedOrderId, setSelectedOrderId] = useState('');

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isArchivedOrderModalOpen, setIsArchivedOrderModalOpen] =
    useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchHistory() {
      try {
        const { data } = await HistoryService.listHistory(controller.signal);

        setArchivedOrders(data);
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Ocorreu um erro ao listar os pedidos arquivados!');
      }
    }

    fetchHistory();

    return () => controller.abort();
  }, []);

  const { format } = currencyFormatter();

  const formattedArchivedOrders = useMemo(() => {
    const formatted = archivedOrders.map(
      ({ id, table, createdAt, products }) => {
        const formattedCreatedAt = new Intl.DateTimeFormat('pt-BR').format(
          new Date(createdAt),
        );

        let firstTwoProductNames = products
          .slice(0, 2)
          .map(({ product }) => product.name)
          .join(', ');

        if (products.length > 2) {
          firstTwoProductNames = firstTwoProductNames.concat('...');
        }

        const firstProductCategory = products[0].product.category;

        const firstProductCategoryName = `${firstProductCategory.emoji} ${firstProductCategory.name}`;

        const orderTotalInCents = products.reduce(
          (acc, { product, quantity }) => acc + quantity * product.priceInCents,
          0,
        );

        const formattedPrice = format(orderTotalInCents);

        return {
          id,
          table,
          formattedCreatedAt,
          firstTwoProductNames,
          firstProductCategoryName,
          formattedPrice,
        };
      },
    );

    return formatted;
  }, [archivedOrders, format]);

  const { handleDeleteOrder: onDeleteOrder } = useOrders();

  function handleOpenArchivedOrderModal(orderId: string) {
    setSelectedOrderId(orderId);
    setIsArchivedOrderModalOpen(true);
  }

  const handleCloseAArchivedOrderModal = useCallback(() => {
    setIsArchivedOrderModalOpen(false);
  }, []);

  function handleOpenDeleteModal(orderId: string) {
    setSelectedOrderId(orderId);
    setIsDeleteModalOpen(true);
  }

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  async function handleDeleteOrder() {
    try {
      await OrdersService.deleteOrder(selectedOrderId);

      onDeleteOrder(selectedOrderId);
      toast.success('Registro removido com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao remover o registro!');
    } finally {
      handleCloseDeleteModal();
    }
  }

  return (
    <>
      {isArchivedOrderModalOpen && (
        <ArchivedOrderModal
          isVisible={isArchivedOrderModalOpen}
          orderId={selectedOrderId}
          onClose={handleCloseAArchivedOrderModal}
          onOpenDeleteModal={handleOpenDeleteModal}
        />
      )}

      <DeleteModal
        isVisible={isDeleteModalOpen}
        title="Excluir Registro"
        confirmText="Tem certeza que deseja excluir o registro?"
        confirmLabel="Excluir Registro"
        cancelLabel="Manter Registro"
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteOrder}
      />

      <Container>
        <Header
          icon={HistoryIcon}
          title="Histórico"
          subtitle="Visualize pedidos anteriores"
        />

        <TableHeader title="Pedidos" length={formattedArchivedOrders.length} />

        <Table>
          <thead>
            <tr>
              <th>Mesa</th>
              <th>Data</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Total</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {formattedArchivedOrders.map(archivedOrder => (
              <tr key={archivedOrder.id}>
                <td>{archivedOrder.table}</td>
                <td>{archivedOrder.formattedCreatedAt}</td>
                <td>{archivedOrder.firstTwoProductNames}</td>
                <td>{archivedOrder.firstProductCategoryName}</td>
                <td>{archivedOrder.formattedPrice}</td>
                <td>
                  <div className="actions">
                    <button
                      type="button"
                      onClick={() =>
                        handleOpenArchivedOrderModal(archivedOrder.id)
                      }
                    >
                      <EyeIcon />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenDeleteModal(archivedOrder.id)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Container>
    </>
  );
}
