import { CanceledError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { User } from '../../@types/User';
import UsersService from '../../services/UsersService';

export function useUsers() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User>({} as User);

  const [isNewUserModalVisible, setIsNewUserModalVisible] = useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditUserModalVisible, setIsEditUserModalVisible] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    async function fetchUsers() {
      try {
        const users = await UsersService.listUsers(controller.signal);

        setUsers(users);
      } catch (error) {
        if (error instanceof CanceledError) {
          return;
        }

        toast.error('Ocorreu um erro listar os usuários!');
      }
    }

    fetchUsers();

    return () => controller.abort();
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

  return {
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
  };
}
