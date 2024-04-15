import {
  ChangeEvent,
  FormEvent,
  ReactNode,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useState,
} from 'react';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Category } from '../../@types/Category';
import { Ingredient } from '../../@types/Ingredient';
import { Product } from '../../@types/Product';
import { useErrors } from '../../hooks/useErrors';
import CategoriesService from '../../services/CategoriesService';
import IngredientsService from '../../services/IngredientsService';
import { formatCurrency } from '../../utils/formatCurrency';
import { Button } from '../Button';
import { Category as CategoryComponent } from '../Category';
import ImageIcon from '../Icons/ImageIcon';
import { ImagePicker } from '../ImagePicker';
import { IngredientCheckbox } from '../IngredientCheckbox';
import { Input } from '../Input';
import { InputGroup } from '../InputGroup';
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

export interface ProductFormHandle {
  setFieldsValues: (product: Product) => void;
}

const productFormSchema = z.object({
  name: z.string().trim().min(1, 'Nome é obrigatório'),
  price: z
    .string({
      required_error: 'Preço é obrigatório',
    })
    .min(1, 'Deve conter pelo menos um dígito'),
  description: z
    .string()
    .trim()
    .min(1, 'Descrição é obrigatório')
    .max(110, 'Máximo 110 caracteres'),
});

export const ProductForm = forwardRef<ProductFormHandle, ProductFormProps>(
  ({ onSubmit, children }, ref) => {
    const [categories, setCategories] = useState<Category[]>([]);
    const [ingredients, setIngredients] = useState<Ingredient[]>([]);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [priceInCents, setPriceInCents] = useState('');
    const [imagePath, setImagePath] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(
      null,
    );
    const [selectedIngredientIds, setSelectedIngredientIds] = useState<
      SelectedIngredients[]
    >([]);

    const [isNewIngredientModalOpen, setIsNewIngredientModalOpen] =
      useState(false);

    const { setError, removeError, getErrorMessageByFieldName } = useErrors();

    const filteredIngredients = useMemo(
      () =>
        ingredients.filter(ingredient =>
          ingredient.name.toLowerCase().includes(searchTerm.toLowerCase()),
        ),
      [searchTerm, ingredients],
    );

    useImperativeHandle(ref, () => ({
      setFieldsValues: (product: Product) => {
        setName(product.name ?? '');
        setDescription(product.description ?? '');
        setPriceInCents(product.priceInCents.toString() ?? '');
        setImagePath(product.imagePath ?? '');
        setSelectedCategoryId(product.category.id ?? '');

        if (product.ingredients) {
          const ingredientIds = product.ingredients.map(item => ({
            ingredientId: item.ingredient.id,
          }));

          setSelectedIngredientIds(ingredientIds);
        }
      },
    }));

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

    function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
      if (event.target.value) {
        removeError('name');
      }

      setName(event.target.value);
    }

    function handlePriceChange(event: ChangeEvent<HTMLInputElement>) {
      const { value } = event.target;

      const normalizeValue = parseFloat(value.replace(/[^\d]/g, ''));

      setPriceInCents(normalizeValue.toString());
      removeError('price');
    }

    function handleDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
      if (event.target.value) {
        removeError('description');
      }

      setDescription(event.target.value);
    }

    function handleSelectCategory(categoryId: string) {
      if (selectedCategoryId === categoryId) {
        return;
      }

      setSelectedCategoryId(categoryId);
    }

    function handleSearchTermChange(event: ChangeEvent<HTMLInputElement>) {
      setSearchTerm(event.target.value);
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
        toast.error('Selecione uma categoria!');
        return;
      }

      formData.set('categoryId', selectedCategoryId);
      formData.set('ingredients', JSON.stringify(selectedIngredientIds));
      formData.set('priceInCents', priceInCents);

      const name = formData.get('name');
      const description = formData.get('description');

      const result = productFormSchema.safeParse({
        name: name,
        description: description,
        price: priceInCents,
      });

      if (!result.success) {
        const { issues } = result.error;

        for (const issue of issues) {
          setError({
            field: issue.path[0].toString(),
            message: issue.message,
          });
        }
      } else {
        onSubmit(formData);
      }
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
                  <ImagePicker imagePath={imagePath} />

                  <label htmlFor="image">
                    <ImageIcon />
                    Selecionar Imagem
                  </label>
                </div>
              </ImageInputWrapper>

              <div className="input-wrapper">
                <InputGroup error={getErrorMessageByFieldName('name')}>
                  <Input
                    label="Nome do produto"
                    name="name"
                    placeholder="Quatro Queijos"
                    value={name}
                    onChange={handleNameChange}
                    error={getErrorMessageByFieldName('name')}
                  />
                </InputGroup>

                <InputGroup error={getErrorMessageByFieldName('price')}>
                  <Input
                    label="Preço"
                    name="priceInCents"
                    placeholder="R$ 35,00"
                    value={
                      priceInCents ? formatCurrency(Number(priceInCents)) : ''
                    }
                    error={getErrorMessageByFieldName('price')}
                    onChange={handlePriceChange}
                  />
                </InputGroup>
              </div>

              <InputGroup error={getErrorMessageByFieldName('description')}>
                <Input
                  label="Descrição"
                  name="description"
                  legend="Máximo 110 caracteres"
                  placeholder="Pizza de Quatro Queijos com borda tradicional"
                  error={getErrorMessageByFieldName('description')}
                  value={description}
                  onChange={handleDescriptionChange}
                />
              </InputGroup>

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
                    id={ingredient.name}
                    name={ingredient.name}
                    ingredient={ingredient}
                    onChange={handleSelectIngredients}
                    checked={
                      selectedIngredientIds.some(
                        item => item.ingredientId === ingredient.id,
                      )
                        ? true
                        : false
                    }
                  />
                ))}
              </IngredientsList>
            </IngredientWrapper>
          </Container>

          {children}
        </Form>
      </>
    );
  },
);
