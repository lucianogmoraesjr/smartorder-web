import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Category } from '../../../@types/Category';
import { Category as CategoryComponent } from '../../../components/Category';
import { DeleteModal } from '../../../components/DeleteModal';
import { EditCategoryModal } from '../../../components/EditCategoryModal';
import PencilIcon from '../../../components/Icons/PencilIcon';
import TrashIcon from '../../../components/Icons/TrashIcon';
import { NewCategoryModal } from '../../../components/NewCategoryModal';
import { Table } from '../../../components/Table';
import { TableHeader } from '../../../components/Table/TableHeader';
import { useAuth } from '../../../hooks/useAuth';
import CategoriesService from '../../../services/CategoriesService';

import { Container } from './styles';

export function Categories() {
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
    async function fetchCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch {
        toast.error('Ocorreu um erro ao carregar as categorias!');
      }
    }

    fetchCategories();
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

  async function handleConfirmDeleteCategory() {
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
  }

  const isAdmin = user.role === 'ADMIN';

  return (
    <Container>
      {isNewCategoryModalVisible && (
        <NewCategoryModal
          isVisible={isNewCategoryModalVisible}
          onClose={handleCloseNewCategoryModal}
          onNewCategory={handleNewCategory}
        />
      )}

      {isEditCategoryModalVisible && (
        <EditCategoryModal
          isVisible={isEditCategoryModalVisible}
          categoryId={selectedCategory.id}
          onClose={handleCloseEditCategoryModal}
          onDelete={handleDeleteCategory}
          onUpdate={handleUpdatedCategory}
        />
      )}

      <DeleteModal
        title="Excluir Categoria"
        confirmText="Tem certeza que deseja excluir a categoria?"
        cancelLabel="Manter Categoria"
        confirmLabel="Excluir Categoria"
        isVisible={isDeleteModalVisible}
        onClose={handleCloseDeleteModal}
        onConfirm={handleConfirmDeleteCategory}
      >
        <CategoryComponent
          emoji={selectedCategory.emoji}
          name={selectedCategory.name}
        />
      </DeleteModal>

      <TableHeader title="Categorias" length={categories.length}>
        {isAdmin && (
          <button type="button" onClick={handleOpenNewCategoryModal}>
            Nova categoria
          </button>
        )}
      </TableHeader>

      <Table>
        <thead>
          <tr>
            <th>Emoji</th>
            <th>Nome</th>
            {isAdmin && <th>Ações</th>}
          </tr>
        </thead>

        <tbody>
          {categories.map(category => (
            <tr key={category.id}>
              <td>{category.emoji}</td>
              <td>{category.name}</td>

              {isAdmin && (
                <td>
                  <div className="actions">
                    <button
                      type="button"
                      onClick={() => handleOpenEditCategoryModal(category)}
                    >
                      <PencilIcon />
                    </button>

                    <button
                      type="button"
                      onClick={() => handleDeleteCategory(category.id)}
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
    </Container>
  );
}
