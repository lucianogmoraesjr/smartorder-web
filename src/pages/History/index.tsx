import { CanceledError } from 'axios';
import { useEffect, useState } from 'react';

import { Order } from '@/@types/Order';
import { Header } from '@/components/Header';
import HistoryIcon from '@/components/Icons/HistoryIcon';
import PencilIcon from '@/components/Icons/PencilIcon';
import TrashIcon from '@/components/Icons/TrashIcon';
import { Table } from '@/components/Table';
import { TableHeader } from '@/components/Table/TableHeader';
import HistoryService from '@/services/HistoryService';
import { currencyFormatter } from '@/utils/currencyFormatter';

import { Container } from './styles';

type ArchivedOrder = Order & {
  products: Array<{
    quantity: number;
    product: {
      id: string;
      name: string;
      imagePath: string;
      priceInCents: number;
      category: {
        emoji: string;
        name: string;
      };
    };
  }>;
};

export function History() {
  const [archivedOrders, setArchivedOrders] = useState<ArchivedOrder[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchHistory() {
      try {
        const { data } = await HistoryService.listHistory(controller.signal);

        setArchivedOrders(data);
      } catch (error) {
        if (error instanceof CanceledError) return;
      }
    }

    fetchHistory();

    return () => controller.abort();
  });

  const { format } = currencyFormatter();

  return (
    <Container>
      <Header
        icon={HistoryIcon}
        title="Histórico"
        subtitle="Visualize pedidos anteriores"
      />

      <TableHeader title="Pedidos" length={archivedOrders.length} />

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
          {archivedOrders.map(archivedOrder => (
            <tr key={archivedOrder.id}>
              <td>{archivedOrder.table}</td>
              <td>
                {new Intl.DateTimeFormat('pt-BR').format(
                  new Date(archivedOrder.createdAt),
                )}
              </td>
              <td>{archivedOrder.products[0].product.name}</td>
              <td>{`${archivedOrder.products[0].product.category.emoji} ${archivedOrder.products[0].product.category.name}`}</td>
              <td>
                {format(
                  archivedOrder.products[0].quantity *
                    archivedOrder.products[0].product.priceInCents,
                )}
              </td>
              <td>
                <div className="actions">
                  <button type="button" onClick={() => {}}>
                    <PencilIcon />
                  </button>

                  <button type="button" onClick={() => {}}>
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
