import { NavLink } from 'react-router-dom';

import { useAuth } from '../../hooks/useAuth';
import HistoryIcon from '../Icons/HistoryIcon';
import HomeIcon from '../Icons/HomeIcon';
import LogoutIcon from '../Icons/LogoutIcon';
import MenuIcon from '../Icons/MenuIcon';
import ProfileIcon from '../Icons/ProfileIcon';
import UsersIcon from '../Icons/UsersIcon';

import {
  Container,
  Logo,
  NavContainer,
  NavItem,
  ProfileContainer,
} from './styles';

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
          <a href="/">
            <HistoryIcon />
            Histórico
          </a>
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

      <ProfileContainer>
        <NavItem>
          <a href="/">
            <ProfileIcon />
            Meu perfil
          </a>
        </NavItem>

        <button type="button" onClick={handleLogout}>
          <LogoutIcon />
          Sair
        </button>
      </ProfileContainer>
    </Container>
  );
}
