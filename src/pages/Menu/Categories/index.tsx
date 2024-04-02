import { useEffect, useState } from 'react';

import PencilIcon from '../../../components/Icons/PencilIcon';
import TrashIcon from '../../../components/Icons/TrashIcon';
import { Table } from '../../../components/Table';
import { TableHeader } from '../../../components/Table/TableHeader';
import { api } from '../../../services/api';

import { Container } from './styles';

interface Category {
  id: string;
  name: string;
  emoji: string;
}

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    api.get('categories').then(response => setCategories(response.data));
  }, []);

  return (
    <Container>
      <TableHeader title="Categorias" length={categories.length}>
        <button type="button">Nova categoria</button>
      </TableHeader>

      <Table>
        <thead>
          <tr>
            <th>Emoji</th>
            <th>Nome</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.emoji}</td>
              <td>{category.name}</td>
              <td>
                <div className="actions">
                  <a href="/">
                    <PencilIcon />
                  </a>

                  <button type="button">
                    <TrashIcon />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
