import { ElementRef, InputHTMLAttributes, forwardRef } from 'react';

import { Container, StyledInput } from './styles';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
  legend?: string;
  error?: string;
}

export const Input = forwardRef<ElementRef<typeof StyledInput>, InputProps>(
  ({ name, label, error, legend, ...rest }: InputProps, ref) => {
    return (
      <Container>
        <label htmlFor={name}>{label}</label>
        <StyledInput id={name} name={name} $error={error} {...rest} ref={ref} />
        {legend && !error && (
          <label htmlFor={name} className="input-legend">
            {legend}
          </label>
        )}
      </Container>
    );
  },
);
