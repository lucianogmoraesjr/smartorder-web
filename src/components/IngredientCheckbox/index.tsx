import { InputHTMLAttributes, forwardRef } from 'react';

import { Container } from './styles';

interface IngredientCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  ingredient: {
    id: string;
    emoji: string;
    name: string;
  };
}

export const IngredientCheckbox = forwardRef<
  HTMLInputElement,
  IngredientCheckboxProps
>(({ ingredient, ...rest }, ref) => {
  return (
    <Container>
      <label htmlFor={ingredient.name}>
        <div>
          <span>{ingredient.emoji}</span>
          <span>{ingredient.name}</span>
        </div>

        <input
          ref={ref}
          type="checkbox"
          id={ingredient.name}
          value={ingredient.id}
          {...rest}
        />
      </label>
    </Container>
  );
});
