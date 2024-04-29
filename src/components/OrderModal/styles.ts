import { styled } from 'styled-components';

export const StatusContainer = styled.div`
  margin-top: 2rem;

  small {
    font-size: 0.875rem;
    opacity: 0.8;
  }

  div {
    margin-top: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const OrderDetails = styled.div`
  margin-top: 2rem;

  > strong {
    font-weight: 500;
    font-size: 0.875rem;
    opacity: 0.8;
  }

  .order-items {
    margin-top: 1rem;

    .item {
      display: flex;

      & + .item {
        margin-top: 1rem;
      }

      img {
        border-radius: 0.375rem;
      }

      .quantity {
        font-size: 0.875rem;
        color: ${({ theme }) => theme.colors.gray[400]};
        display: block;
        min-width: 1.25rem;
        margin-left: 0.75rem;
      }

      .product-details {
        margin-left: 0.25rem;

        strong {
          display: block;
          margin-bottom: 0.25rem;
        }

        span {
          font-size: 0.875rem;
          color: ${({ theme }) => theme.colors.gray[400]};
        }
      }
    }
  }

  .total {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 1.5rem;

    span {
      font-weight: 500;
      font-size: 0.875rem;
      opacity: 0.8;
    }
  }
`;

export const Actions = styled.footer`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 2rem;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .primary {
    background: ${({ theme }) => theme.colors.red.main};
    border-radius: 999px;
    border: 0;
    color: #fff;
    padding: 0.875rem 3.5rem;
  }

  .cancel {
    all: unset;
    color: ${({ theme }) => theme.colors.red.main};
    font-weight: bold;
    text-align: center;
    cursor: pointer;
  }
`;
