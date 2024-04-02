import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    line-height: 1.5;
    color: #333;
  }
`;

export const StyledInput = styled.input`
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 0.5rem;

  &::placeholder {
    color: #999;
    font-size: 0%.875rem;
    line-height: 1.5;
  }
`;
