import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Product } from '../../../@types/Product';
import PencilIcon from '../../../components/Icons/PencilIcon';
import TrashIcon from '../../../components/Icons/TrashIcon';
import { Table } from '../../../components/Table';
import { TableHeader } from '../../../components/Table/TableHeader';
import ProductsService from '../../../services/ProductsService';
import { formatCurrency } from '../../../utils/formatCurrency';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const productsList = await ProductsService.listProducts();

        setProducts(productsList);
      } catch (error) {
        toast.error('Ocorreu um erro ao listar os produtos!');
      }
    }

    fetchProducts();
  }, []);

  return (
    <>
      <TableHeader title="Produtos" length={products.length}>
        <button type="button">Novo produto</button>
      </TableHeader>

      <Table>
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
              <td>
                {product.category
                  ? `${product.category.emoji} ${product.category.name}`
                  : ''}
              </td>
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
      </Table>
    </>
  );
}
