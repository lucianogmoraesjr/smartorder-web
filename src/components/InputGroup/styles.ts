import { styled } from 'styled-components';

export const Container = styled.div`
  small {
    position: absolute;
    color: ${({ theme }) => theme.colors.red.main};
    font-size: 0.875rem;
    display: block;
    margin-top: 0.5rem;
  }
`;
