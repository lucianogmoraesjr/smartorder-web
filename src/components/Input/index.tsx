import { InputHTMLAttributes } from 'react';

import { Container, StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  error?: string;
}

export function Input({ name, label, error, ...rest }: InputProps) {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <StyledInput id={name} $error={error} {...rest} />
    </Container>
  );
}
