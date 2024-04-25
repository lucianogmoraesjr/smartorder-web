import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding-right: 5rem;

  button {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
`;

export const ModalBody = styled.div`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    max-width: 280px;

    text-align: center;
    line-height: 1.5;
    font-weight: 500;

    & + p {
      margin-top: 1rem;
    }
  }
`;

export const ModalActions = styled.div`
  margin-top: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
