import { ReactNode } from 'react';

import { Container } from './styles';

interface FormGroupProps {
  children: ReactNode;
  error?: string;
}

export function FormGroup({ children, error }: FormGroupProps) {
  return (
    <Container>
      <div className="form-item">{children}</div>

      {error && <small>{error}</small>}
    </Container>
  );
}
