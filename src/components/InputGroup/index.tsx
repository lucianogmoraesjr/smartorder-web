import { ReactNode } from 'react';

import { Container } from './styles';

interface InputGroupProps {
  children: ReactNode;
  error?: string;
}

export function InputGroup({ children, error }: InputGroupProps) {
  return (
    <Container>
      <div className="form-item">{children}</div>

      {error && <small>{error}</small>}
    </Container>
  );
}
