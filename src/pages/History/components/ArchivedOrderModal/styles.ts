import { styled } from 'styled-components';

export const OrderCreatedAt = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  small {
    font-size: 0.875rem;
    line-height: 1.5;
    font-weight: 500;
  }

  span {
    font-weight: 600;
    line-height: 1.5;
  }
`;

export const OrderDetails = styled.div`
  margin: 2rem 0;

  > strong {
    font-weight: 500;
    font-size: 0.875rem;
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
    }
  }
`;
