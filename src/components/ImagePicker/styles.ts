import { styled } from 'styled-components';

export const Container = styled.div`
  > input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border-width: 0;
  }
`;

export const ImagePreviewContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 10rem;
  background: ${({ theme }) => theme.colors.gray[100]};

  img.preview {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
