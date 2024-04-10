import { styled } from 'styled-components';

export const Container = styled.div`
  small {
    color: ${({ theme }) => theme.colors.red.main};
    font-size: 0.75rem;
    display: block;
    margin-top: 0.5rem;
  }
`;
