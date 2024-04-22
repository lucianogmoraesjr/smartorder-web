import { InputHTMLAttributes, forwardRef } from 'react';

import { Category } from '@/@types/Category';

import { Category as CategoryComponent } from '../Category';

import { Radio } from './styles';

interface CategoryRadioProps extends InputHTMLAttributes<HTMLInputElement> {
  category: Category;
}

export const CategoryRadio = forwardRef<HTMLInputElement, CategoryRadioProps>(
  ({ category, ...rest }, ref) => {
    return (
      <Radio htmlFor={category.name}>
        <CategoryComponent emoji={category.emoji} name={category.name} />

        <input
          ref={ref}
          type="radio"
          value={category.id}
          id={category.name}
          {...rest}
        />
      </Radio>
    );
  },
);
