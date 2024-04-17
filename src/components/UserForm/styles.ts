import { styled } from 'styled-components';

export const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button[type='submit'] {
    margin-top: 0.5rem;
  }
`;

export const RadioContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  span {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray[400]};

    &:last-child {
      color: ${({ theme }) => theme.colors.red.main};
    }
  }
`;

export const RadioGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
`;

export const RadioItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  input[type='radio'] {
    width: 1.125rem;
    height: 1.125rem;
  }

  label {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;
