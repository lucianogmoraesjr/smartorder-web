import { styled } from 'styled-components';

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

export const NavItem = styled.nav`
  a {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0.5rem;

    text-decoration: none;
    color: #666;
    font-size: 0.875rem;
    line-height: 1.4;
    font-weight: 500;

    svg {
      width: 1.125rem;
      height: 1.125rem;

      path {
        stroke: #666;
      }
    }

    &.active {
      color: #d73035;

      &::after {
        content: '';
        background: #d73035;
        position: absolute;
        bottom: -0.5rem;
        left: 50%;
        transform: translateX(-50%);
        width: 0.75rem;
        height: 0.09375rem;
        border-radius: 999px;
      }

      svg {
        path {
          stroke: #d73035;
        }
      }
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
