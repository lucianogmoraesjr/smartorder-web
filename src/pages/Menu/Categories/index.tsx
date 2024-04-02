import { useCallback, useEffect, useState } from 'react';

import { EditCategoryModal } from '../../../components/EditCategoryModal';
import PencilIcon from '../../../components/Icons/PencilIcon';
import TrashIcon from '../../../components/Icons/TrashIcon';
import { NewCategoryModal } from '../../../components/NewCategoryModal';
import { Table } from '../../../components/Table';
import { TableHeader } from '../../../components/Table/TableHeader';
import { api } from '../../../services/api';
import { Category } from '../../../types/Category';

import { Container } from './styles';

export function Categories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(
    null,
  );
  const [isEditCategoryModalVisible, setIsEditCategoryModalVisible] =
    useState(false);
  const [isNewCategoryModalVisible, setIsNewCategoryModalVisible] =
    useState(false);

  useEffect(() => {
    api.get('categories').then(response => setCategories(response.data));
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

  function handleNewCategory(category: Category) {
    setCategories(prevState => prevState.concat(category));
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
        onClose={handleCloseEditCategoryModal}
        category={selectedCategory}
      />

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
