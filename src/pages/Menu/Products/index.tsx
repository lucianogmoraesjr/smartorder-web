import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Product } from '../../../@types/Product';
import { DeleteModal } from '../../../components/DeleteModal';
import PencilIcon from '../../../components/Icons/PencilIcon';
import TrashIcon from '../../../components/Icons/TrashIcon';
import { NewProductModal } from '../../../components/NewProductModal';
import { Table } from '../../../components/Table';
import { TableHeader } from '../../../components/Table/TableHeader';
import ProductsService from '../../../services/ProductsService';
import { formatCurrency } from '../../../utils/formatCurrency';

import { DeleteProductContainer, ProductContainer } from './styles';

export function Products() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    {} as Product,
  );

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isNewProductModalVisible, setIsNewProductModalVisible] =
    useState(false);

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

  function handleOpenNewProductModal() {
    setIsNewProductModalVisible(true);
  }

  const handleCloseNewProductModal = useCallback(() => {
    setIsNewProductModalVisible(false);
  }, []);

  const handleNewProduct = useCallback((product: Product) => {
    setProducts(prevState => prevState.concat(product));
  }, []);

  function handleOpenDeleteModal(product: Product) {
    setSelectedProduct(product);
    setIsDeleteModalVisible(true);
  }

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  const handleConfirmDeleteProduct = useCallback(async () => {
    try {
      await ProductsService.deleteProduct(selectedProduct.id);

      setProducts(prevState =>
        prevState.filter(product => product.id !== selectedProduct.id),
      );

      handleCloseDeleteModal();

      toast.success('Produto deletado com sucesso!');
    } catch (error) {
      toast.error('Ocorreu um erro ao deletar o produto!');
    }
  }, [selectedProduct.id, handleCloseDeleteModal]);

  return (
    <>
      {isNewProductModalVisible && (
        <NewProductModal
          isVisible={isNewProductModalVisible}
          onClose={handleCloseNewProductModal}
          onNewProduct={handleNewProduct}
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
        <button type="button" onClick={handleOpenNewProductModal}>
          Novo produto
        </button>
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
              <td>{formatCurrency(product.priceInCents)}</td>

              <td>
                <div className="actions">
                  <a href="/">
                    <PencilIcon />
                  </a>

                  <button
                    type="button"
                    onClick={() => handleOpenDeleteModal(product)}
                  >
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
