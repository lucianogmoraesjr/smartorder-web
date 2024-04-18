import { DeleteModal } from '@/components/DeleteModal';
import PencilIcon from '@/components/Icons/PencilIcon';
import TrashIcon from '@/components/Icons/TrashIcon';
import { Table } from '@/components/Table';
import { TableHeader } from '@/components/Table/TableHeader';
import { formatCurrency } from '@/utils/formatCurrency';

import { EditProductModal } from './components/EditProductModal';
import { NewProductModal } from './components/NewProductModal';
import { DeleteProductContainer, ProductContainer } from './styles';
import { useProducts } from './useProducts';

export function Products() {
  const {
    products,
    selectedProduct,
    isDeleteModalVisible,
    isNewProductModalVisible,
    isEditProductModalVisible,
    user,
    handleOpenNewProductModal,
    handleCloseNewProductModal,
    handleNewProduct,
    handleOpenEditModal,
    handleUpdatedProduct,
    handleCloseEditModal,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDeleteProduct,
  } = useProducts();

  const isAdmin = user.role === 'ADMIN';

  return (
    <>
      {isNewProductModalVisible && (
        <NewProductModal
          isVisible={isNewProductModalVisible}
          onClose={handleCloseNewProductModal}
          onNewProduct={handleNewProduct}
        />
      )}

      {isEditProductModalVisible && (
        <EditProductModal
          isVisible={isEditProductModalVisible}
          productId={selectedProduct.id}
          onClose={handleCloseEditModal}
          onUpdate={handleUpdatedProduct}
        />
      )}

      <DeleteModal
        isVisible={isDeleteModalVisible}
        title="Excluir Produto"
        confirmLabel="Excluir Produto"
        confirmText="Tem certeza que deseja excluir o produto?"
        cancelLabel="Manter Produto"
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteProduct}
      >
        <DeleteProductContainer>
          <img
            src={`http://localhost:3333/tmp/${selectedProduct.imagePath}`}
            alt={`Imagem de ${selectedProduct.name}`}
          />

          <ProductContainer>
            {selectedProduct.category && (
              <div>
                <span>{selectedProduct.category.emoji}</span>
                <span>{selectedProduct.category.name}</span>
              </div>
            )}

            <strong>{selectedProduct.name}</strong>

            <span>{formatCurrency(selectedProduct.priceInCents)}</span>
          </ProductContainer>
        </DeleteProductContainer>
      </DeleteModal>

      <TableHeader title="Produtos" length={products.length}>
        {isAdmin && (
          <button type="button" onClick={handleOpenNewProductModal}>
            Novo produto
          </button>
        )}
      </TableHeader>

      <Table>
        <thead>
          <tr>
            <th>Imagem</th>
            <th>Nome</th>
            <th>Categoria</th>
            <th>Preço</th>
            {isAdmin && <th>Ações</th>}
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
              <td>{formatCurrency(product.priceInCents)}</td>

              {isAdmin && (
                <td>
                  <div className="actions">
                    <button
                      type="button"
                      onClick={() => handleOpenEditModal(product)}
                    >
                      <PencilIcon />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleOpenDeleteModal(product)}
                    >
                      <TrashIcon />
                    </button>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </>
  );
}
