import { styled } from 'styled-components';

interface OverlayProps {
  $overlay?: 'normal' | 'light';
}

export const Overlay = styled.div<OverlayProps>`
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: ${({ $overlay = 'normal' }) =>
    $overlay === 'normal' ? 'rgba(0, 0, 0, 0.8)' : 'rgba(0, 0, 0, 0.4)'};
  backdrop-filter: blur(4.5px);
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalContainer = styled.div`
  background: #fff;
  min-width: 30rem;
  max-height: 966px;
  border-radius: 0.5rem;
  padding: 2rem;
  overflow-y: auto;
`;

export const ModalHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;

  strong {
    font-size: 1.5rem;
  }

  button {
    all: unset;
    line-height: 0;
    cursor: pointer;
  }
`;
