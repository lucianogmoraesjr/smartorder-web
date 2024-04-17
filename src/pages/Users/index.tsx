import { Header } from '../../components/Header';
import PencilIcon from '../../components/Icons/PencilIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import UsesIcon from '../../components/Icons/UsersIcon';
import { Table } from '../../components/Table';
import { TableHeader } from '../../components/Table/TableHeader';

import { Container } from './styles';

export function Users() {
  return (
    <Container>
      <Header
        icon={UsesIcon}
        title="Usuários"
        subtitle="Cadastre e gerencie seus usuários"
      />

      <TableHeader title="Usuários" length={2}>
        <button type="button">Novo usuário</button>
      </TableHeader>

      <Table>
        <thead>
          <tr>
            <th>Nome</th>
            <th>E-mail</th>
            <th>Cargo</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>Admin</td>
            <td>admin@mail.com</td>
            <td>Administrador</td>
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
