import { css, styled } from 'styled-components';

interface StyledInputProps {
  $error?: string;
}

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray[500]};
  }

  .input-legend {
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const StyledInput = styled.input<StyledInputProps>`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  outline: none;
  border-radius: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
    font-size: 0.875rem;
    line-height: 1.5;
  }

  &[type='number'] {
    -moz-appearance: textfield;
    appearance: textfield;

    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
    }
  }

  ${({ theme, $error }) =>
    $error &&
    css`
      color: ${theme.colors.red.dark};
      border-width: 2px;
      border-color: ${theme.colors.red.main} !important;
    `}
`;
