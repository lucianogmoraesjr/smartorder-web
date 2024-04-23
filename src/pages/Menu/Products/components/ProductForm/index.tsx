import { ReactNode } from 'react';
import { Controller } from 'react-hook-form';

import { Product } from '@/@types/Product';
import { Button } from '@/components/Button';
import { CategoryRadio } from '@/components/CategoryRadio';
import ImageIcon from '@/components/Icons/ImageIcon';
import { ImagePicker } from '@/components/ImagePicker';
import { Input } from '@/components/Input';
import { InputGroup } from '@/components/InputGroup';
import { NewIngredientModal } from '@/components/NewIngredientModal';
import { currencyFormatter } from '@/utils/currencyFormatter';

import { IngredientCheckbox } from '../IngredientCheckbox';

import {
  CategoriesList,
  CategorySelected,
  CategoryWrapper,
  Container,
  Form,
  ImageInputWrapper,
  IngredientsList,
  IngredientWrapper,
  ProductWrapper,
} from './styles';
import { ProductFormData, useProductForm } from './useProductForm';

interface ProductFormProps {
  children: ReactNode;
  product?: Product;
  onSubmit: (data: ProductFormData) => Promise<void>;
}

export function ProductForm({ onSubmit, children, product }: ProductFormProps) {
  const {
    isNewIngredientModalOpen,
    errors,
    control,
    selectedCategory,
    categories,
    searchTerm,
    filteredIngredients,
    handleCloseNewIngredientModal,
    handleNewIngredient,
    handleSubmit,
    register,
    resetField,
    handleOpenNewIngredientModal,
    handleSearchTermChange,
  } = useProductForm(product);

  const { format, parse } = currencyFormatter();

  return (
    <>
      <NewIngredientModal
        isVisible={isNewIngredientModalOpen}
        onClose={handleCloseNewIngredientModal}
        onNewIngredient={handleNewIngredient}
      />

      <Form onSubmit={handleSubmit(onSubmit)}>
        <Container>
          <ProductWrapper>
            <ImageInputWrapper>
              <strong>Imagem</strong>

              <div>
                <ImagePicker
                  imagePath={product?.imagePath}
                  {...register('image')}
                />

                <label htmlFor="image">
                  <ImageIcon />
                  Selecionar Imagem
                </label>
              </div>
            </ImageInputWrapper>

            <div className="input-wrapper">
              <InputGroup error={errors.name?.message}>
                <Input
                  label="Nome do produto"
                  placeholder="Quatro Queijos"
                  error={errors.name?.message}
                  {...register('name')}
                />
              </InputGroup>

              <InputGroup error={errors.priceInCents?.message}>
                <Controller
                  name="priceInCents"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Preço"
                      name="priceInCents"
                      placeholder="R$ 35,00"
                      value={format(Number(field.value))}
                      error={errors.priceInCents?.message}
                      onChange={e => field.onChange(parse(e.target.value))}
                    />
                  )}
                />
              </InputGroup>
            </div>

            <InputGroup error={errors.description?.message}>
              <Input
                label="Descrição"
                legend="Máximo 110 caracteres"
                placeholder="Pizza de Quatro Queijos com borda tradicional"
                error={errors.description?.message}
                {...register('description')}
              />
            </InputGroup>

            <CategoryWrapper>
              <div>
                <strong>Categoria</strong>

                {selectedCategory && (
                  <CategorySelected>
                    <span>{selectedCategory.emoji}</span>
                    <span>{selectedCategory.name}</span>
                    <Button
                      type="button"
                      $variant="secondary"
                      onClick={() => resetField('categoryId')}
                    >
                      Alterar
                    </Button>
                  </CategorySelected>
                )}
              </div>

              {errors.categoryId && (
                <span className="category-error">
                  {errors.categoryId.message}
                </span>
              )}

              {!selectedCategory && (
                <CategoriesList>
                  {categories.map(category => (
                    <CategoryRadio
                      key={category.id}
                      category={category}
                      {...register('categoryId')}
                    />
                  ))}
                </CategoriesList>
              )}
            </CategoryWrapper>
          </ProductWrapper>

          <IngredientWrapper>
            <div className="ingredients-header">
              <strong>Ingredientes</strong>

              <Button
                type="button"
                $variant="secondary"
                onClick={handleOpenNewIngredientModal}
              >
                Novo ingrediente
              </Button>
            </div>

            <Input
              label="Busque o ingrediente"
              name="search"
              value={searchTerm}
              onChange={handleSearchTermChange}
              placeholder="Ex: Quatro Queijos"
            />

            <IngredientsList>
              {filteredIngredients.map(ingredient => (
                <IngredientCheckbox
                  key={ingredient.id}
                  ingredient={ingredient}
                  {...register('ingredients')}
                />
              ))}
            </IngredientsList>
          </IngredientWrapper>
        </Container>

        {children}
      </Form>
    </>
  );
}
