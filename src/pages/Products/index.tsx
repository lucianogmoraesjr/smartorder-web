import { Header } from '../../components/Header';
import MenuIcon from '../../components/Icons/MenuIcon';

import { Container } from './styles';

export function Products() {
  return (
    <Container>
      <Header
        title="Cardápio"
        subtitle="Gerencie os produtos do seu estabelecimento"
        icon={MenuIcon}
      />
      <h1>Products</h1>
    </Container>
  );
}
