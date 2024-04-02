import { InputHTMLAttributes } from 'react';

import { Container, StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

export function Input({ name, label, ...rest }: InputProps) {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <StyledInput id={name} {...rest} />
    </Container>
  );
}
