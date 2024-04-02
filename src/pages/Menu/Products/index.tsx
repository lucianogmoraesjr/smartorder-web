import { useEffect, useState } from 'react';

import PencilIcon from '../../../components/Icons/PencilIcon';
import TrashIcon from '../../../components/Icons/TrashIcon';
import { QuantityBadge } from '../../../components/QuantityBadge';
import { api } from '../../../services/api';
import { formatCurrency } from '../../../utils/formatCurrency';

import { Container, ProductsContainer, ProductsTable } from './styles';

interface Product {
  id: string;
  name: string;
  priceInCents: number;
  imagePath: string;
  category: {
    name: string;
    emoji: string;
  };
}

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    api.get('products').then(response => setProducts(response.data));
  }, []);

  return (
    <Container>
      <ProductsContainer>
        <header className="products-header">
          <div>
            <strong>Produtos</strong>
            <QuantityBadge>3</QuantityBadge>
          </div>

          <button type="button">Novo produto</button>
        </header>

        <ProductsTable>
          <thead>
            <tr>
              <th>Imagem</th>
              <th>Nome</th>
              <th>Categoria</th>
              <th>Preço</th>
              <th>Ações</th>
            </tr>
          </thead>

          <tbody>
            {products.map(product => (
              <tr key={product.id}>
                <td>
                  <img
                    src={`http://localhost:3333/tmp/${product.imagePath}`}
                    alt={`Imagem de ${product.name}`}
                  />
                </td>
                <td>{product.name}</td>
                <td>{`${product.category.emoji} ${product.category.name}`}</td>
                <td>{formatCurrency(product.priceInCents / 100)}</td>

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
        </ProductsTable>
      </ProductsContainer>
    </Container>
  );
}
