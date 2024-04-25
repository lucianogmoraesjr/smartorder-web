import { zodResolver } from '@hookform/resolvers/zod';
import { ReactNode } from 'react';
import {
  FormProvider as ReactHookFormProvider,
  useForm,
} from 'react-hook-form';
import { z } from 'zod';

const productFormSchema = z.object({
  image: z.instanceof(FileList).transform(list => list.item(0)),
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

export function FormProvider({ children }: { children: ReactNode }) {
  const form = useForm<ProductFormData>({
    resolver: zodResolver(productFormSchema),
    defaultValues: {
      ingredients: [],
    },
  });

  return <ReactHookFormProvider {...form}>{children}</ReactHookFormProvider>;
}
