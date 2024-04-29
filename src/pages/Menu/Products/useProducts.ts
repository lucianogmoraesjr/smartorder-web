import { CanceledError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Product } from '@/@types/Product';
import { useAuth } from '@/hooks/useAuth';
import ProductsService from '@/services/ProductsService';

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>(
    {} as Product,
  );

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isNewProductModalVisible, setIsNewProductModalVisible] =
    useState(false);
  const [isEditProductModalVisible, setIsEditProductModalVisible] =
    useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchProducts() {
      try {
        const productsList = await ProductsService.listProducts(
          controller.signal,
        );

        setProducts(productsList);
      } catch (error) {
        if (error instanceof CanceledError) {
          return;
        }

        toast.error('Ocorreu um erro ao listar os produtos!');
      }
    }

    fetchProducts();

    return () => controller.abort();
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

  function handleOpenEditModal(product: Product) {
    setIsEditProductModalVisible(true);
    setSelectedProduct(product);
  }

  const handleUpdatedProduct = useCallback(
    (product: Product) => {
      const updatedProductsList = products.filter(
        item => item.id !== product.id,
      );

      setProducts([...updatedProductsList, product]);
    },
    [products],
  );

  const handleCloseEditModal = useCallback(() => {
    setIsEditProductModalVisible(false);
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

  return {
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
  };
}
