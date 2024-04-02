import { styled } from 'styled-components';

export const Board = styled.div`
  padding: 1rem;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;

  > header {
    padding: 0.5rem;
    font-size: 1.125rem;
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }
`;

export const OrdersContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 1.5rem;

  button {
    background: #fff;
    border: 1px solid rgba(204, 204, 204, 0.4);
    height: 8rem;
    border-radius: 0.5rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 0.25rem;

    strong {
      font-weight: 500;
    }

    span {
      font-size: 0.875rem;
      color: #666;
    }

    & + button {
      margin-top: 1.5rem;
    }
  }
`;

export const QuantityBadge = styled.span`
  display: flex;
  background: rgba(204, 204, 204, 0.2);
  padding: 0.25rem 0.5rem;
  border-radius: 0.25rem;
  font-size: 1.125rem;
  line-height: 1.2;
  font-weight: 600;
`;
