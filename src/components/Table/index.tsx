import { ReactNode } from 'react';

import { ProductsTable, TableContainer } from './styles';

interface TableProps {
  children: ReactNode;
}

export function Table({ children }: TableProps) {
  return (
    <TableContainer>
      <ProductsTable>{children}</ProductsTable>
    </TableContainer>
  );
}
