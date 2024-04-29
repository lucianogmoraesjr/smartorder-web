import { DeleteModal } from '../../components/DeleteModal';
import { Header } from '../../components/Header';
import PencilIcon from '../../components/Icons/PencilIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import UsersIcon from '../../components/Icons/UsersIcon';
import { Input } from '../../components/Input';
import { Table } from '../../components/Table';
import { TableHeader } from '../../components/Table/TableHeader';

import { EditUserModal } from './components/EditUserModal';
import { NewUserModal } from './components/NewUserModal';
import { Container, DeleteModalContent } from './styles';
import { useUsers } from './useUsers';

export function Users() {
  const {
    users,
    selectedUser,
    isNewUserModalVisible,
    isDeleteModalVisible,
    isEditUserModalVisible,
    handleOpenNewUserModal,
    handleNewUser,
    handleCloseNewUserModal,
    handleOpenEditUserModal,
    handleUpdateUser,
    handleCloseEditUserModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleDeleteUser,
  } = useUsers();

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
          icon={UsersIcon}
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
