import { styled } from 'styled-components';

interface ButtonProps {
  $variant?: 'primary' | 'secondary';
}

export const Button = styled.button<ButtonProps>`
  background: ${({ $variant = 'primary' }) =>
    $variant === 'primary' ? '#D73035' : 'none'};
  border: 0;
  color: ${({ $variant = 'primary' }) =>
    $variant === 'primary' ? '#fff' : '#D73035'};
  padding: ${({ $variant = 'primary' }) =>
    $variant === 'primary' ? '0.875rem 1.75rem' : '0'};
  border-radius: 999px;
  font-weight: 600;

  &:disabled {
    background: #ccc;
    cursor: default;
  }
`;
