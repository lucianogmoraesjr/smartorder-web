import { styled } from 'styled-components';

export const Container = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.5rem;
`;

export const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.25rem;

  span {
    font-weight: 500;
    line-height: 1.5;
  }

  strong {
    font-size: 2rem;
    line-height: 1.2;

    &:last-child {
      font-weight: 400;
    }
  }
`;

export const LoginForm = styled.form`
  width: 24rem;
  display: flex;
  flex-direction: column;
  gap: 2rem;

  button {
    margin-top: 0.5rem;
  }
`;
