import { styled } from 'styled-components';

export const Container = styled.div``;

export const ProductsContainer = styled.main`
  margin-top: 2rem;

  .products-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > div {
      display: flex;
      align-items: center;
      gap: 0.5rem;

      span {
        font-weight: 400;
      }
    }

    > button {
      all: unset;
      color: #d73035;
      font-size: 0.875rem;
      font-weight: 600;
      line-height: 1.5;
      cursor: pointer;
    }
  }
`;

export const ProductsTable = styled.table`
  width: 100%;
  margin-top: 1rem;
  border-spacing: 0;

  thead {
    text-align: left;
    background-color: rgba(204, 204, 204, 0.2);

    th {
      padding: 1rem;
      border-top: 1px solid rgba(204, 204, 204, 0.4);

      &:first-child {
        border-left: 1px solid rgba(204, 204, 204, 0.4);
        border-top-left-radius: 0.5rem;
      }

      &:last-child {
        border-right: 1px solid rgba(204, 204, 204, 0.4);
        border-top-right-radius: 0.5rem;
        width: 6rem;
      }
    }
  }

  tbody {
    td {
      padding: 1rem;
      border-bottom: 1px solid rgba(204, 204, 204, 0.4);

      &:first-child {
        border-left: 1px solid rgba(204, 204, 204, 0.4);
      }

      &:last-child {
        border-right: 1px solid rgba(204, 204, 204, 0.4);
        width: 6rem;
      }
    }

    tr:last-child td:first-child {
      border-bottom-left-radius: 0.5rem;
    }

    tr:last-child td:last-child {
      border-bottom-right-radius: 0.5rem;
    }

    .actions {
      display: flex;
      align-items: center;
      gap: 2rem;

      svg {
        width: 1.5rem;
        height: 1.5rem;
      }

      a {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      button {
        all: unset;
        display: flex;
        align-items: center;
        justify-content: center;
        cursor: pointer;
      }
    }
  }

  img {
    width: 48px;
    height: 32px;
    border-radius: 0.25rem;
  }
`;
