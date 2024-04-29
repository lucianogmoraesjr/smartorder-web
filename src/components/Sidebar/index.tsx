import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import HistoryIcon from '../Icons/HistoryIcon';
import HomeIcon from '../Icons/HomeIcon';
import LogoutIcon from '../Icons/LogoutIcon';
import MenuIcon from '../Icons/MenuIcon';
import UsersIcon from '../Icons/UsersIcon';

import { Container, Logo, NavContainer, NavItem } from './styles';

export function Sidebar() {
  const { signOut, user } = useAuth();

  function handleLogout() {
    signOut();
  }

  const isAdmin = user.role === 'ADMIN';

  return (
    <Container>
      <Logo>
        <strong>S</strong>
        <span>O</span>
      </Logo>

      <NavContainer>
        <NavItem>
          <NavLink to="/">
            <HomeIcon />
            Home
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/history">
            <HistoryIcon />
            Histórico
          </NavLink>
        </NavItem>

        <NavItem>
          <NavLink to="/menu">
            <MenuIcon />
            Cardápio
          </NavLink>
        </NavItem>

        {isAdmin && (
          <NavItem>
            <NavLink to="/users">
              <UsersIcon />
              Usuários
            </NavLink>
          </NavItem>
        )}
      </NavContainer>

      <button type="button" onClick={handleLogout}>
        <LogoutIcon />
        Sair
      </button>
    </Container>
  );
}
