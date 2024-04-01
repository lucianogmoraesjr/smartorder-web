import { NavLink } from 'react-router-dom';

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
          <NavLink to="/products">
            <MenuIcon />
            Cardápio
          </NavLink>
        </NavItem>

        <NavItem>
          <a href="/">
            <UsersIcon />
            Usuários
          </a>
        </NavItem>
      </NavContainer>

      <ProfileContainer>
        <NavItem>
          <a href="/">
            <ProfileIcon />
            Meu perfil
          </a>
        </NavItem>

        <button type="button">
          <LogoutIcon />
          Sair
        </button>
      </ProfileContainer>
    </Container>
  );
}
