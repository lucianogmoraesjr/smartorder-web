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
import CategoriesService from '../../../services/CategoriesService';

import { Container } from './styles';

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category>(
    {} as Category,
  );

  const [isDeleteModalVisible, setIsDeleteModalVisible] = useState(false);
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] =
    useState(false);
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] =
    useState(false);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch (error) {
        console.log(error);
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

  function handleOpenEditCategoryModal(category: Category) {
    setSelectedCategory(category);
    setIsEditCategoryModalVisible(true);
  }

  const handleCloseEditCategoryModal = useCallback(() => {
    setIsEditCategoryModalVisible(false);
  }, []);

  const handleCloseDeleteModal = useCallback(() => {
    setIsDeleteModalVisible(false);
  }, []);

  function handleNewCategory(category: Category) {
    setCategories(prevState => prevState.concat(category));
  }

  const handleDeleteCategory = useCallback((category: Category) => {
    setIsDeleteModalVisible(true);
    setSelectedCategory(category);
  }, []);

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

  return (
    <Container>
      <NewCategoryModal
        isVisible={isNewCategoryModalVisible}
        onClose={handleCloseNewCategoryModal}
        onNewCategory={handleNewCategory}
      />

      <EditCategoryModal
        isVisible={isEditCategoryModalVisible}
        category={selectedCategory}
        onClose={handleCloseEditCategoryModal}
        onDelete={handleDeleteCategory}
      />

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
        <button type="button" onClick={handleOpenNewCategoryModal}>
          Nova categoria
        </button>
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
                  <button
                    type="button"
                    onClick={() => handleOpenEditCategoryModal(category)}
                  >
                    <PencilIcon />
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCategory(category)}
                  >
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
