import historyIcon from '../../assets/images/history-icon.svg';
import homeIcon from '../../assets/images/home-icon.svg';
import logoutIcon from '../../assets/images/logout-icon.svg';
import menuIcon from '../../assets/images/menu-icon.svg';
import profileIcon from '../../assets/images/profile-icon.svg';
import usersIcon from '../../assets/images/users-icon.svg';

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
          <a href="/">
            <img src={homeIcon} alt="Ícone de casa" />
            Home
          </a>
        </NavItem>

        <NavItem>
          <a href="/">
            <img src={historyIcon} alt="Ícone de histórico" />
            Histórico
          </a>
        </NavItem>

        <NavItem>
          <a href="/">
            <img src={menuIcon} alt="Ícone de cardápio" />
            Cardápio
          </a>
        </NavItem>

        <NavItem>
          <a href="/">
            <img src={usersIcon} alt="Ícone de usuários" />
            Usuários
          </a>
        </NavItem>
      </NavContainer>

      <ProfileContainer>
        <NavItem>
          <a href="/">
            <img src={profileIcon} alt="Ícone de perfil do usuário" />
            Meu perfil
          </a>
        </NavItem>

        <button type="button">
          <img src={logoutIcon} alt="Ícone de botão de sair" />
          Sair
        </button>
      </ProfileContainer>
    </Container>
  );
}
