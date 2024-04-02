import { NavLink, Outlet } from 'react-router-dom';

import { Header } from '../../components/Header';
import MenuIcon from '../../components/Icons/MenuIcon';

import { Container, NavBar } from './styles';

export function Menu() {
  return (
    <Container>
      <Header
        title="Cardápio"
        subtitle="Gerencie os produtos do seu estabelecimento"
        icon={MenuIcon}
      />

      <NavBar>
        <NavLink to="products">Produtos</NavLink>

        <NavLink to="categories">Categorias</NavLink>
      </NavBar>

      <Outlet />
    </Container>
  );
}
