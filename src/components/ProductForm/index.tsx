import { ChangeEvent, FormEvent, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { Category } from '../../@types/Category';
import { Ingredient } from '../../@types/Ingredient';
import CategoriesService from '../../services/CategoriesService';
import IngredientsService from '../../services/IngredientsService';
import { Button } from '../Button';
import { Category as CategoryComponent } from '../Category';
import ImageIcon from '../Icons/ImageIcon';
import { ImagePicker } from '../ImagePicker';
import { IngredientCheckbox } from '../IngredientCheckbox';
import { Input } from '../Input';

import {
  CategoriesList,
  CategoryWrapper,
  Container,
  Form,
  ImageInputWrapper,
  IngredientWrapper,
  IngredientsList,
  ProductWrapper,
} from './styles';

interface ProductFormProps {
  children: ReactNode;
  onSubmit: () => void;
}

interface SelectedIngredients {
  ingredientId: string;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function ProductForm({ onSubmit, children }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<
    SelectedIngredients[]
  >([]);

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

  function handleSelectCategory(categoryId: string) {
    if (selectedCategoryId === categoryId) {
      return;
    }

    setSelectedCategoryId(categoryId);
  }

  function handleSelectIngredients(event: ChangeEvent<HTMLInputElement>) {
    const isChecked = event.target.checked;
    const { value } = event.target;

    if (isChecked) {
      setSelectedIngredientIds(prevState =>
        prevState.concat({
          ingredientId: value,
        }),
      );
    }

    if (!isChecked) {
      setSelectedIngredientIds(prevState =>
        prevState.filter(({ ingredientId }) => ingredientId !== value),
      );
    }
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!selectedCategoryId) {
      return;
    }

    formData.set('categoryId', selectedCategoryId);

    console.log('formData', formData.get('categoryId'));
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Container>
        <ProductWrapper>
          <ImageInputWrapper>
            <strong>Imagem</strong>

            <div>
              <ImagePicker />

              <label htmlFor="image">
                <ImageIcon />
                Selecionar Imagem
              </label>
            </div>
          </ImageInputWrapper>

          <div className="input-wrapper">
            <Input
              label="Nome do produto"
              name="name"
              placeholder="Quatro Queijos"
            />

            <Input label="Preço" name="price" placeholder="R$ 35,00" />
          </div>

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
                <button
                  type="button"
                  key={category.id}
                  onClick={() => handleSelectCategory(category.id)}
                  className={
                    selectedCategoryId === category.id ? 'selected' : ''
                  }
                >
                  <CategoryComponent
                    emoji={category.emoji}
                    name={category.name}
                  />
                </button>
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
                onChange={handleSelectIngredients}
              />
            ))}
          </IngredientsList>
        </IngredientWrapper>
      </Container>

      {children}
    </Form>
  );
}
