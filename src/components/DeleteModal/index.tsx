import { ReactNode } from 'react';

import { Button } from '../Button';
import { Modal } from '../Modal';

import { Actions, Container } from './styles';

interface DeleteModalProps {
  isVisible: boolean;
  title: string;
  confirmText?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onClose: () => void;
  onConfirm: () => void;
  children?: ReactNode;
}

export function DeleteModal({
  title,
  confirmText,
  confirmLabel,
  cancelLabel,
  isVisible,
  children,
  onClose,
  onConfirm,
}: DeleteModalProps) {
  return (
    <Modal title={title} isVisible={isVisible} onClose={onClose}>
      <Container>
        {confirmText ? (
          <p>{confirmText}</p>
        ) : (
          <p>'Tem certeza que deseja excluir?'</p>
        )}

        {children}

        <Actions>
          <Button $variant="secondary" onClick={onClose}>
            {cancelLabel ? cancelLabel : 'Cancelar'}
          </Button>

          <Button onClick={onConfirm}>
            {confirmLabel ? confirmLabel : 'Excluir'}
          </Button>
        </Actions>
      </Container>
    </Modal>
  );
}
