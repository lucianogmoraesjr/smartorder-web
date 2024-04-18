import { toast } from 'react-toastify';

import { User, UserRequestBody } from '../../../../@types/User';
import { Button } from '../../../../components/Button';
import { Modal } from '../../../../components/Modal';
import UsersService from '../../../../services/UsersService';
import { UserForm } from '../UserForm';

import { Container } from './styles';

interface NewUserModalProps {
  isVisible: boolean;
  onClose: () => void;
  onNewUser: (user: User) => void;
}

export function NewUserModal({
  isVisible,
  onClose,
  onNewUser,
}: NewUserModalProps) {
  async function handleSubmit(data: UserRequestBody) {
    try {
      const user = await UsersService.createUser(data);

      onNewUser(user);

      onClose();
      toast.success('Usuário cadastrado com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao cadastrar o usuário!');
    }
  }

  return (
    <Modal title="Novo Usuário" isVisible={isVisible} onClose={onClose}>
      <Container>
        <UserForm onSubmit={handleSubmit}>
          <Button type="submit">Cadastrar usuário</Button>
        </UserForm>
      </Container>
    </Modal>
  );
}
