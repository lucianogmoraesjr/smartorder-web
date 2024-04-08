import { styled } from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  label {
    font-size: 0.875rem;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray[500]};
  }
`;

export const StyledInput = styled.input`
  padding: 1rem;
  border: 1px solid ${({ theme }) => theme.colors.gray[200]};
  border-radius: 0.5rem;
  font-size: 0.875rem;
  line-height: 1.5;

  &::placeholder {
    color: ${({ theme }) => theme.colors.gray[300]};
    font-size: 0.875rem;
    line-height: 1.5;
  }
`;
