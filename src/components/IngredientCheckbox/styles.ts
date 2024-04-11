import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  border: 1px solid rgba(204, 204, 204, 0.3);
  border-radius: 0.5rem;

  > label {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem;
    width: 100%;
    cursor: pointer;

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;
    }

    input {
      -webkit-appearance: none;
      appearance: none;
      width: 1.125rem;
      height: 1.125rem;
      border-radius: 0.3125rem;
      cursor: pointer;
      border: 1px solid ${({ theme }) => theme.colors.gray[400]};
      box-shadow: 0 0 0 0.5px ${({ theme }) => theme.colors.gray[400]};

      &:checked {
        position: relative;
      }

      &:checked::before {
        content: '';
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: no-repeat center/100% url('/checkmark.svg');
        width: 0.75rem;
        height: 0.75rem;
      }
    }
  }
`;
