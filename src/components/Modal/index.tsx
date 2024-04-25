import { ComponentType, ReactNode, useEffect } from 'react';

import CloseIcon from '../Icons/CloseIcon';
import { ReactPortal } from '../ReactPortal';

import { ModalContainer, ModalHeader, Overlay } from './styles';

interface ModalProps {
  isVisible: boolean;
  title: string;
  children: ReactNode;
  containerId?: string;
  overlay?: 'normal' | 'light';
  icon?: ComponentType;
  onClose: () => void;
}

export function Modal({
  isVisible,
  title,
  children,
  containerId = 'modal-root',
  overlay = 'normal',
  icon: Icon,
  onClose,
}: ModalProps) {
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
    <ReactPortal containerId={containerId}>
      <Overlay onClick={onClose} $overlay={overlay}>
        <ModalContainer onClick={e => e.stopPropagation()}>
          <ModalHeader>
            <div className="title-container">
              {Icon && <Icon />}
              <strong>{title}</strong>
            </div>

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
