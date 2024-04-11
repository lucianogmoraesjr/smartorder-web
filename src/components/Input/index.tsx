import { InputHTMLAttributes } from 'react';

import { Container, StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  legend?: string;
  error?: string;
}

export function Input({ name, label, error, legend, ...rest }: InputProps) {
  return (
    <Container>
      <label htmlFor={name}>{label}</label>
      <StyledInput id={name} $error={error} {...rest} />
      {legend && (
        <label htmlFor={name} className="input-legend">
          {legend}
        </label>
      )}
    </Container>
  );
}
