import { ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Category } from '../../@types/Category';
import { Ingredient } from '../../@types/Ingredient';
import imagePlaceholder from '../../assets/images/image-placeholder.svg';
import CategoriesService from '../../services/CategoriesService';
import IngredientsService from '../../services/IngredientsService';
import { Button } from '../Button';
import { Category as CategoryComponent } from '../Category';
import ImageIcon from '../Icons/ImageIcon';
import { IngredientCheckbox } from '../IngredientCheckbox';
import { Input } from '../Input';

import {
  CategoriesList,
  CategoryWrapper,
  Container,
  Form,
  ImageInputWrapper,
  ImagePreviewContainer,
  IngredientWrapper,
  IngredientsList,
  ProductWrapper,
} from './styles';

interface ProductFormProps {
  children: ReactNode;
  onSubmit: () => void;
}

export function ProductForm({ onSubmit, children }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  useEffect(() => {
    async function fetchCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories();

        setCategories(categoriesList);
      } catch {
        toast.error('Ocorreu um erro ao buscar as categorias!');
      }
    }

    fetchCategories();
  }, []);

  useEffect(() => {
    async function fetchIngredients() {
      try {
        const ingredientsList = await IngredientsService.listIngredients();

        setIngredients(ingredientsList);
      } catch {
        toast.error('Ocorreu um erro ao buscar os ingredients!');
      }
    }

    fetchIngredients();
  }, []);

  return (
    <Form onSubmit={onSubmit}>
      <Container>
        <ProductWrapper>
          <ImageInputWrapper>
            <strong>Imagem</strong>

            <div>
              <ImagePreviewContainer>
                <img src={imagePlaceholder} alt="" />
              </ImagePreviewContainer>

              <label htmlFor="image">
                <ImageIcon />
                Selecionar Imagem
              </label>

              <input type="file" name="image" id="image" accept="image/*" />
            </div>
          </ImageInputWrapper>

          <Input
            label="Nome do produto"
            name="name"
            placeholder="Quatro Queijos"
          />

          <Input
            label="Descrição"
            name="description"
            legend="Máximo 110 caracteres"
            placeholder="Pizza de Quatro Queijos com borda tradicional"
          />

          <CategoryWrapper>
            <strong>Categoria</strong>

            <CategoriesList>
              {categories.map(category => (
                <CategoryComponent
                  key={category.id}
                  emoji={category.emoji}
                  name={category.name}
                />
              ))}
            </CategoriesList>
          </CategoryWrapper>
        </ProductWrapper>

        <IngredientWrapper>
          <div className="ingredients-header">
            <strong>Ingredientes</strong>

            <Button $variant="secondary">Novo ingrediente</Button>
          </div>

          <Input
            label="Busque o ingrediente"
            name="search"
            placeholder="Ex: Quatro Queijos"
          />

          <IngredientsList>
            {ingredients.map(ingredient => (
              <IngredientCheckbox
                key={ingredient.id}
                id={ingredient.name}
                name={ingredient.name}
                ingredient={ingredient}
              />
            ))}
          </IngredientsList>
        </IngredientWrapper>
      </Container>

      {children}
    </Form>
  );
}
