import { Header } from '@/components/Header';
import HistoryIcon from '@/components/Icons/HistoryIcon';
import PencilIcon from '@/components/Icons/PencilIcon';
import TrashIcon from '@/components/Icons/TrashIcon';
import { Table } from '@/components/Table';
import { TableHeader } from '@/components/Table/TableHeader';

import { Container } from './styles';

export function History() {
  return (
    <Container>
      <Header
        icon={HistoryIcon}
        title="Histórico"
        subtitle="Visualize pedidos anteriores"
      />

      <TableHeader title="Pedidos" length={3} />

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
          <tr>
            <td>123</td>
            <td>27/03/2024</td>
            <td>Frango com Catupiry, Quatro Queijos</td>
            <td>🍕 Pizza</td>
            <td>R$ 45,00</td>
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
        </tbody>
      </Table>
    </Container>
  );
}
