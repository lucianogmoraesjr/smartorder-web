import { Header } from '../../components/Header';
import MenuIcon from '../../components/Icons/MenuIcon';
import PencilIcon from '../../components/Icons/PencilIcon';
import TrashIcon from '../../components/Icons/TrashIcon';
import { QuantityBadge } from '../../components/OrdersBoard/styles';

import { Container, NavBar, ProductsContainer, ProductsTable } from './styles';

export function Products() {
  return (
    <Container>
      <Header
        title="Cardápio"
        subtitle="Gerencie os produtos do seu estabelecimento"
        icon={MenuIcon}
      />

      <NavBar>
        <a href="/" className="active">
          Produtos
        </a>

        <a href="/">Categorias</a>
      </NavBar>

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
            <tr>
              <td>
                <img
                  src="http://localhost:3333/tmp/1710780936676-quatro-queijos.png"
                  alt=""
                />
              </td>
              <td>Quatro Queijos</td>
              <td>🍕 Pizza</td>
              <td>R$ 40,00</td>

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

            <tr>
              <td>
                <img
                  src="http://localhost:3333/tmp/1710780936676-quatro-queijos.png"
                  alt=""
                />
              </td>
              <td>Quatro Queijos</td>
              <td>🍕 Pizza</td>
              <td>R$ 40,00</td>

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
          </tbody>
        </ProductsTable>
      </ProductsContainer>
    </Container>
  );
}
