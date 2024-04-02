import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-right: 5rem;
`;

export const NavBar = styled.nav`
  display: flex;
  width: 100%;
  border-bottom: 1px solid rgba(204, 204, 204, 0.4);

  a {
    text-decoration: none;
    font-size: 0.875rem;
    line-height: 1.5;
    color: #666;
    padding: 1rem 2.5rem;
    border-top-left-radius: 0.5rem;
    border-top-right-radius: 0.5rem;

    &.active {
      color: #d73035;
      font-weight: 600;
      background: #fff;
    }
  }
`;
