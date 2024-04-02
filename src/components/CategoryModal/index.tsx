import { ReactPortal } from '../ReactPortal';

import { ModalBody, Overlay } from './styles';

interface CategoryModalProps {
  isVisible: boolean;
}

export function CategoryModal({ isVisible }: CategoryModalProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <ReactPortal containerId="category-modal">
      <Overlay>
        <ModalBody>CategoryModal</ModalBody>
      </Overlay>
    </ReactPortal>
  );
}
