import { styled } from 'styled-components';

export const DeleteProductContainer = styled.div`
  display: flex;
  align-items: center;
  width: 22rem;
  border: 1px solid rgba(204, 204, 204, 0.4);
  border-radius: 0.5rem;
  overflow: hidden;

  img {
    width: 158px;
    height: 124px;
    object-fit: cover;
  }
`;

export const ProductContainer = styled.div`
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.75rem;

  > div {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    font-weight: 500;
    line-height: 1.5;
  }

  strong {
    font-weight: 600;
    line-height: 1.2;
  }

  > span {
    font-weight: 500;
    line-height: 1.5;
  }
`;
