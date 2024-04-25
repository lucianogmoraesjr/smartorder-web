import { zodResolver } from '@hookform/resolvers/zod';
import { CanceledError } from 'axios';
import { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { z } from 'zod';

import { Category } from '@/@types/Category';
import { Ingredient } from '@/@types/Ingredient';
import { Product } from '@/@types/Product';
import CategoriesService from '@/services/CategoriesService';
import IngredientsService from '@/services/IngredientsService';

const productFormSchema = z.object({
  image: z
    .instanceof(FileList)
    .refine(files => !!files.item(0), 'Imagem é obrigatório')
    .transform(files => files.item(0))
    .or(z.null()),
  name: z.string().min(1, 'Nome é obrigatório'),
  priceInCents: z
    .number({ required_error: 'Preço é obrigatório' })
    .min(1, 'Preço é obrigatório'),
  description: z.string().min(1, 'Descrição é obrigatório'),
  categoryId: z
    .string({ invalid_type_error: 'Selecione uma categoria' })
    .cuid()
    .min(1, 'Categoria é obrigatório'),
  ingredients: z.array(z.string().cuid()).optional(),
});

export type ProductFormData = z.infer<typeof productFormSchema>;

export function useProductForm(product?: Product) {
  const [categories, setCategories] = useState<Category[]>([]);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [searchTerm, setSearchTerm] = useState('');

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
    const controller = new AbortController();

    async function fetchCategories() {
      try {
        const categoriesList = await CategoriesService.listCategories(
          controller.signal,
        );

        setCategories(categoriesList);
      } catch (error) {
        if (error instanceof CanceledError) {
          return;
        }

        toast.error('Ocorreu um erro ao buscar as categorias!');
      }
    }

    async function fetchIngredients() {
      try {
        const ingredientsList = await IngredientsService.listIngredients(
          controller.signal,
        );

        setIngredients(ingredientsList);
      } catch (error) {
        if (error instanceof CanceledError) {
          return;
        }

        toast.error('Ocorreu um erro ao buscar os ingredients!');
      }
    }

    fetchCategories();
    fetchIngredients();

    return () => controller.abort();
  }, []);

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

  const {
    handleSubmit,
    register,
    watch,
    resetField,
    control,
    setError,
    formState: { errors },
  } = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ingredients: [],
    },
    values: product && {
      name: product.name,
      description: product.description,
      priceInCents: product.priceInCents,
      categoryId: product.category?.id,
      image: null,
      ingredients: product.ingredients?.map(ingredient => ingredient.id),
    },
  });

  const categoryId = watch('categoryId');

  const selectedCategory = useMemo(() => {
    return categories.find(category => category.id === categoryId);
  }, [categoryId, categories]);

  return {
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
    setError,
    handleOpenNewIngredientModal,
    handleSearchTermChange,
  };
}
