import { Home } from '../../pages/Home';
import { Sidebar } from '../Sidebar';
import { Container } from './styles';

export function Layout() {
  return (
    <Container>
      <Sidebar />
      <Home />
    </Container>
  );
}
