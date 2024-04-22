import { styled } from 'styled-components';

export const Form = styled.form`
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  gap: 3rem;
`;

export const Container = styled.div`
  display: flex;
  gap: 2rem;
`;

export const ProductWrapper = styled.div`
  display: flex;
  width: 26rem;
  flex-direction: column;
  gap: 2rem;

  & .input-wrapper {
    display: flex;
    align-items: center;
    gap: 1rem;

    & div:first-child {
      flex: 1;
    }

    & div:last-child .form-item {
      width: 120px;
    }
  }
`;

export const ImageInputWrapper = styled.div`
  strong {
    font-size: 1.125rem;
    font-weight: 600;
    line-height: 1.2;
    color: ${({ theme }) => theme.colors.gray[400]};
  }

  > div {
    margin-top: 1rem;
    border: 1px solid ${({ theme }) => theme.colors.gray[200]};
    border-radius: 0.5rem;
    overflow: hidden;

    label {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 0.5rem;
      height: 5.25rem;
      color: ${({ theme }) => theme.colors.red.main};
      font-weight: 600;

      cursor: pointer;
    }
  }
`;

export const CategoryWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 100%;

  & div:first-child {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 0.875rem;
      font-weight: 400;
      line-height: 1.5;
      color: ${({ theme }) => theme.colors.gray[400]};
    }
  }

  span.category-error {
    margin-top: -0.75rem;

    font-size: 0.875rem;
    color: ${({ theme }) => theme.colors.red.main};
  }
`;

export const CategorySelected = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.875rem;
  border-radius: 999px;
  box-shadow: 0px 0px 3px rgba(0, 0, 0, 0.1);
`;

export const CategoriesList = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  gap: 0.75rem;
`;

export const IngredientWrapper = styled.div`
  width: 26rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;

  .ingredients-header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    > strong {
      font-size: 1.125rem;
      font-weight: 600;
      line-height: 1.2;
      color: ${({ theme }) => theme.colors.gray[400]};
    }

    > button {
      font-size: 0.875rem;
    }
  }
`;

export const IngredientsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  max-height: 476px;
  overflow-y: auto;
`;
