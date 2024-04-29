import { styled } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  background: ${({ $variant = 'primary', theme }) =>
    $variant === 'primary' ? theme.colors.red.main : 'none'};
  border: 0;
  color: ${({ $variant = 'primary', theme }) =>
    $variant === 'primary' ? '#fff' : theme.colors.red.main};
  padding: ${({ $variant = 'primary' }) =>
    $variant === 'primary' ? '0.875rem 1.75rem' : '0'};
  border-radius: 999px;
  font-weight: 600;

  &:disabled {
    background: ${({ theme }) => theme.colors.gray[200]};
    cursor: default;
  }
`;
