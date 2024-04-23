import { styled } from 'styled-components';

export const Container = styled.div`
  width: 100%;
  padding-right: 5rem;

  table {
    thead {
      tr th:first-child {
        width: 6rem;
      }

      tr th:nth-child(2) {
        width: 10rem;
      }
    }

    tbody {
      tr td:first-child {
        width: 6rem;
      }

      tr td:nth-child(2) {
        width: 10rem;
      }
    }
  }
`;
