import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { User } from '../../@types/User';
import { Header } from '../../components/Header';
import PencilIcon from '../../components/Icons/PencilIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import UsesIcon from '../../components/Icons/UsersIcon';
import { Table } from '../../components/Table';
import { TableHeader } from '../../components/Table/TableHeader';
import UsersService from '../../services/UsersService';

import { Container } from './styles';

export function Users() {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await UsersService.listUsers();

        setUsers(users);
      } catch {
        toast.error('Ocorreu um erro listar os usuários!');
      }
    }

    fetchUsers();
  }, []);

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
          {users.map(user => (
            <tr key={user.id}>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role === 'ADMIN' ? 'Administrador' : 'Garçom'}</td>
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
