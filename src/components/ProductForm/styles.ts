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

    & div:last-child {
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

  strong {
    font-size: 0.875rem;
    font-weight: 400;
    line-height: 1.5;
    color: ${({ theme }) => theme.colors.gray[400]};
  }
`;

export const CategoriesList = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: stretch;
  column-gap: 0.75rem;
  row-gap: 1rem;

  > button {
    all: unset;
    cursor: pointer;

    &.selected {
      outline: 1px solid ${({ theme }) => theme.colors.red.main};
      border-radius: 999px;
    }
  }
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
  height: 26.875rem;
  overflow-y: auto;
`;
