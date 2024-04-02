import { Container } from './styles';

interface CategoryProps {
  emoji: string;
  name: string;
}

export function Category({ emoji, name }: CategoryProps) {
  return (
    <Container>
      <span>{emoji}</span>
      <span>{name}</span>
    </Container>
  );
}
