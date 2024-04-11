import { InputHTMLAttributes } from 'react';

import { Container } from './styles';

interface IngredientCheckboxProps
  extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  id: string;
  ingredient: {
    id: string;
    emoji: string;
    name: string;
  };
}

export function IngredientCheckbox({
  id,
  name,
  ingredient,
  ...rest
}: IngredientCheckboxProps) {
  return (
    <Container>
      <label htmlFor={id}>
        <div>
          <span>{ingredient.emoji}</span>
          <span>{ingredient.name}</span>
        </div>

        <input
          type="checkbox"
          name={name}
          id={id}
          value={ingredient.id}
          {...rest}
        />
      </label>
    </Container>
  );
}
