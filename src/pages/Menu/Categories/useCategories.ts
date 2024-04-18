import { CanceledError } from 'axios';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Category } from '../../../@types/Category';
import { useAuth } from '../../../hooks/useAuth';
import CategoriesService from '../../../services/CategoriesService';

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    {} as Category,
  );

  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] =
    useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] =
    useState(false);
  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);

  const { user } = useAuth();

  useEffect(() => {
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories(
          controller.signal,
        );

        setCategories(categoriesList);
      } catch (error) {
        if (error instanceof CanceledError) return;

        toast.error('Ocorreu um erro ao carregar as categorias!');
      }
    }

    fetchCategories();

    return () => controller.abort();
  }, []);

  function handleOpenNewCategoryModal() {
    setIsNewCategoryModalVisible(true);
  }

  const handleCloseNewCategoryModal = useCallback(() => {
    setIsNewCategoryModalVisible(false);
  }, []);

  const handleNewCategory = useCallback((category: Category) => {
    setCategories(prevState => prevState.concat(category));
  }, []);

  function handleOpenEditCategoryModal(category: Category) {
    setIsEditCategoryModalVisible(true);
    setSelectedCategory(category);
  }

  const handleUpdatedCategory = useCallback((category: Category) => {
    setCategories(prevState => {
      const filteredCategories = prevState.filter(
        item => item.id !== category.id,
      );

      return filteredCategories.concat(category);
    });
  }, []);

  const handleCloseEditCategoryModal = useCallback(() => {
    setIsEditCategoryModalVisible(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  const handleDeleteCategory = useCallback(
    (categoryId: string) => {
      const category = categories.find(category => category.id === categoryId);

      if (!category) {
        return;
      }

      setIsDeleteModalVisible(true);
      setSelectedCategory(category);
    },
    [categories],
  );

  const handleConfirmDeleteCategory = useCallback(async () => {
    try {
      await CategoriesService.deleteCategory(selectedCategory.id);

      setCategories(prevState =>
        prevState.filter(category => category.id !== selectedCategory.id),
      );

      handleCloseDeleteModal();

      toast.success('Categoria deletada com sucesso!');
    } catch {
      toast.error('Ocorreu um erro ao deletar a categoria!');
    }
  }, [handleCloseDeleteModal, selectedCategory.id]);

  return {
    categories,
    selectedCategory,
    isNewCategoryModalVisible,
    isEditCategoryModalVisible,
    isDeleteModalVisible,
    user,
    handleOpenNewCategoryModal,
    handleCloseNewCategoryModal,
    handleNewCategory,
    handleOpenEditCategoryModal,
    handleUpdatedCategory,
    handleCloseEditCategoryModal,
    handleCloseDeleteModal,
    handleDeleteCategory,
    handleConfirmDeleteCategory,
  };
}
