import { ReactNode } from 'react';

import { QuantityBadge } from '../../QuantityBadge';

import { Header } from './styles';

interface TableHeaderProps {
  title: string;
  length: number;
  children?: ReactNode;
}

export function TableHeader({ length, title, children }: TableHeaderProps) {
  return (
    <Header>
      <div>
        <strong>{title}</strong>
        <QuantityBadge>{length}</QuantityBadge>
      </div>

      {children}
    </Header>
  );
}
