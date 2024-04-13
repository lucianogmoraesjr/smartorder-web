import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';

import { Category } from '../../@types/Category';
import { Ingredient } from '../../@types/Ingredient';
import CategoriesService from '../../services/CategoriesService';
import IngredientsService from '../../services/IngredientsService';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Category as CategoryComponent } from '../Category';
import ImageIcon from '../Icons/ImageIcon';
import { ImagePicker } from '../ImagePicker';
import { IngredientCheckbox } from '../IngredientCheckbox';
import { Input } from '../Input';
import { NewIngredientModal } from '../NewIngredientModal';

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
  onSubmit: (data: FormData) => Promise<void>;
}

interface SelectedIngredients {
  ingredientId: string;
}

export function ProductForm({ onSubmit, children }: ProductFormProps) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [priceInCents, setPriceInCents] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
    null,
  );
  const [selectedIngredientIds, setSelectedIngredientIds] = useState<
    SelectedIngredients[]
  >([]);

  const [isNewIngredientModalOpen, setIsNewIngredientModalOpen] =
    useState(false);

  const filteredIngredients = useMemo(
    () =>
      ingredients.filter(ingredient =>
        ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()),
      ),
    [searchTerm, ingredients],
  );

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

  function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
    const { value } = event.target;

    const normalizeValue = parseFloat(value.replace(/[^\d]/g, ''));

    setPriceInCents(normalizeValue.toString());
  }

  function handleSearchTermChange(event: ChangeEvent<HTMLInputElement>) {
    setSearchTerm(event.target.value);
  }

  function handleOpenNewIngredientModal() {
    setIsNewIngredientModalOpen(true);
  }

  const handleCloseNewIngredientModal = useCallback(() => {
    setIsNewIngredientModalOpen(false);
  }, []);

  const handleNewIngredient = useCallback((ingredient: Ingredient) => {
    setIngredients(prevState => prevState.concat(ingredient));
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    if (!selectedCategoryId) {
      return;
    }

    formData.set('categoryId', selectedCategoryId);
    formData.set('ingredients', JSON.stringify(selectedIngredientIds));
    formData.set('priceInCents', priceInCents);

    onSubmit(formData);
  }

  return (
    <>
      <NewIngredientModal
        isVisible={isNewIngredientModalOpen}
        onClose={handleCloseNewIngredientModal}
        onNewIngredient={handleNewIngredient}
      />

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

              <Input
                label="Preço"
                name="priceInCents"
                placeholder="R$ 35,00"
                value={priceInCents ? formatCurrency(Number(priceInCents)) : ''}
                onChange={handlePriceChange}
              />
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

              <Button
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
    </>
  );
}
