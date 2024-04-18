import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { User } from '../../@types/User';
import { DeleteModal } from '../../components/DeleteModal';
import { EditUserModal } from '../../components/EditUserModal';
import { Header } from '../../components/Header';
import PencilIcon from '../../components/Icons/PencilIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import UsesIcon from '../../components/Icons/UsersIcon';
import { Input } from '../../components/Input';
import { NewUserModal } from '../../components/NewUserModal';
import { Table } from '../../components/Table';
import { TableHeader } from '../../components/Table/TableHeader';
import UsersService from '../../services/UsersService';

import { Container, DeleteModalContent } from './styles';

export function Users() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({} as User);

  const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);

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

  function handleOpenNewUserModal() {
    setIsNewUserModalVisible(true);
  }

  const handleNewUser = useCallback((user: User) => {
    setUsers(prevState => prevState.concat(user));
  }, []);

  const handleCloseNewUserModal = useCallback(() => {
    setIsNewUserModalVisible(false);
  }, []);

  function handleOpenEditUserModal(user: User) {
    setSelectedUser(user);
    setIsEditUserModalVisible(true);
  }

  const handleUpdateUser = useCallback(
    (user: User) => {
      const updatedUsers = users.filter(item => item.id !== user.id);

      setUsers([...updatedUsers, user]);
    },
    [users],
  );

  const handleCloseEditUserModal = useCallback(() => {
    setIsEditUserModalVisible(false);
  }, []);

  function handleOpenDeleteModal(user: User) {
    setSelectedUser(user);
    setIsDeleteModalVisible(true);
  }

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  async function handleDeleteUser() {
    try {
      await UsersService.deleteUser(selectedUser.id);

      setUsers(prevState =>
        prevState.filter(user => user.id !== selectedUser.id),
      );

      handleCloseDeleteModal();
    } catch {
      toast.error('Ocorreu um erro excluir o usuário!');
    }
  }

  return (
    <>
      <NewUserModal
        isVisible={isNewUserModalVisible}
        onClose={handleCloseNewUserModal}
        onNewUser={handleNewUser}
      />

      {isEditUserModalVisible && (
        <EditUserModal
          isVisible={isEditUserModalVisible}
          userId={selectedUser.id}
          onClose={handleCloseEditUserModal}
          onUpdate={handleUpdateUser}
        />
      )}

      <DeleteModal
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleDeleteUser}
        title="Excluir Usuário"
        confirmText="Tem certeza que deseja excluir o usuário?"
        cancelLabel="Manter Usuário"
        confirmLabel="Excluir Usuário"
      >
        <DeleteModalContent>
          <Input label="Nome" name="name" value={selectedUser.name} disabled />
          <Input
            label="E-mail"
            name="email"
            value={selectedUser.email}
            disabled
          />
        </DeleteModalContent>
      </DeleteModal>

      <Container>
        <Header
          icon={UsesIcon}
          title="Usuários"
          subtitle="Cadastre e gerencie seus usuários"
        />

        <TableHeader title="Usuários" length={2}>
          <button type="button" onClick={handleOpenNewUserModal}>
            Novo usuário
          </button>
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
                    <button
                      type="button"
                      onClick={() => handleOpenEditUserModal(user)}
                    >
                      <PencilIcon />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenDeleteModal(user)}
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
