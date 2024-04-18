import { CanceledError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { User, UserRequestBody } from '../../../../@types/User';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';
import UsersService from '../../../../services/UsersService';
import { UserForm } from '../UserForm';

import { Actions, Container } from './styles';

interface EditUserModal {
  isVisible: boolean;
  userId: string;
  onClose: () => void;
  onUpdate: (user: User) => void;
}

export function EditUserModal({
  isVisible,
  userId,
  onClose,
  onUpdate,
}: EditUserModal) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    async function getUser() {
      try {
        const user = await UsersService.getUserById(userId, controller.signal);

        setUser(user);
      } catch (error) {
        if (error instanceof CanceledError) {
          return;
        }

        toast.error('Ocorreu um erro ao buscar o usuário!');
      }
    }

    getUser();

    return () => controller.abort();
  }, [userId]);

  const handleSubmit = useCallback(
    async (data: UserRequestBody) => {
      try {
        const updatedUser = await UsersService.updateUser(userId, data);

        onUpdate(updatedUser);

        onClose();
        toast.success('Usuário editado com editado com sucesso!');
      } catch {
        toast.error('Ocorreu um erro ao editar o usuário!');
      }
    },
    [onClose, onUpdate, userId],
  );

  if (!user) {
    return;
  }

  return (
    <Modal
      isVisible={isVisible}
      onClose={onClose}
      title="Editar Usuário"
      containerId="edit-user-modal"
    >
      <Container>
        <UserForm
          onSubmit={handleSubmit}
          defaultValues={{
            name: user.name,
            email: user.email,
            role: user.role,
          }}
        >
          <Actions>
            <Button type="button" $variant="secondary">
              Excluir usuário
            </Button>
            <Button type="submit">Salvar Alterações</Button>
          </Actions>
        </UserForm>
      </Container>
    </Modal>
  );
}
