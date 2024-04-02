import { styled } from 'styled-components';

export const Container = styled.header`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 4.5rem;
  margin-top: 2.5rem;
`;

export const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  .page-details {
    display: flex;
    flex-direction: column;
    gap: 1rem;

    h2 {
      color: #666;
      font-weight: 400;
      font-size: 1rem;
      line-height: 1.5;
    }
  }
`;

export const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;

  svg {
    width: 1.5rem;
    height: 1.5rem;

    path {
      stroke: #333;
    }
  }

  h1 {
    font-size: 1.5rem;
  }
`;
