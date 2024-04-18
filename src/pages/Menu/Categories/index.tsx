import { Category as CategoryComponent } from '@/components/Category';
import { DeleteModal } from '@/components/DeleteModal';
import PencilIcon from '@/components/Icons/PencilIcon';
import TrashIcon from '@/components/Icons/TrashIcon';
import { Table } from '@/components/Table';
import { TableHeader } from '@/components/Table/TableHeader';

import { EditCategoryModal } from './components/EditCategoryModal';
import { NewCategoryModal } from './components/NewCategoryModal';
import { Container } from './styles';
import { useCategories } from './useCategories';

export function Categories() {
  const {
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
  } = useCategories();

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
