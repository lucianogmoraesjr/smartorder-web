import styled from 'styled-components';

export const Container = styled.div`
  background: #fff;
  height: 100vh;
  max-width: 110px;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 2.5rem 0;
`;

export const Logo = styled.div`
  font-size: 1.5rem;
  color: #666;

  strong {
    font-weight: 700;
  }

  span {
    font-weight: 300;
  }
`;

export const NavContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
`;

export const NavItem = styled.div`
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    text-decoration: none;
    color: #666;
    font-size: 0.875rem;
    line-height: 1.4;

    img {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2.5rem;

  button {
    all: unset;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;
    color: #666;

    cursor: pointer;

    img {
      width: 1.125rem;
      height: 1.125rem;
    }
  }
`;
