import { ReactNode, useEffect } from 'react';

import CloseIcon from '../Icons/CloseIcon';
import { ReactPortal } from '../ReactPortal';

import { ModalContainer, ModalHeader, Overlay } from './styles';

interface ModalProps {
  isVisible: boolean;
  title: string;
  children: ReactNode;
  onClose: () => void;
}

export function Modal({ isVisible, title, children, onClose }: ModalProps) {
  useEffect(() => {
    function closeModalOnPressEsc(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }

    document.addEventListener('keydown', closeModalOnPressEsc);

    return () => document.removeEventListener('keydown', closeModalOnPressEsc);
  }, [onClose]);

  if (!isVisible) {
    return null;
  }

  return (
    <ReactPortal containerId="modal-root">
      <Overlay onClick={onClose}>
        <ModalContainer onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <strong>{title}</strong>

            <button type="button" onClick={onClose}>
              <CloseIcon />
            </button>
          </ModalHeader>
          {children}
        </ModalContainer>
      </Overlay>
    </ReactPortal>
  );
}
