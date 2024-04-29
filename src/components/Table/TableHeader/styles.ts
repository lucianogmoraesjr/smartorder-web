import { styled } from 'styled-components';

export const Header = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;
  font-size: 1.125rem;
  line-height: 1.2;

  > div {
    display: flex;
    align-items: center;
    gap: 0.5rem;

    strong {
      font-weight: 600;
    }

    span {
      font-weight: 500;
      font-size: 1rem;
    }
  }

  > button {
    all: unset;
    color: ${({ theme }) => theme.colors.red.main};
    font-size: 0.875rem;
    font-weight: 600;
    line-height: 1.5;
    cursor: pointer;
  }
`;
