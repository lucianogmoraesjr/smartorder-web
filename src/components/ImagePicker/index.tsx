import { ChangeEvent, useState } from 'react';

import imagePlaceholder from '../../assets/images/image-placeholder.svg';

import { Container, ImagePreviewContainer } from './styles';

interface ImagePickerProps {
  imagePath?: string;
}

export function ImagePicker({ imagePath }: ImagePickerProps) {
  const [preview, setPreview] = useState<string | null>(null);

  function handleFileSelected(event: ChangeEvent<HTMLInputElement>) {
    const { files } = event.target;

    if (!files) {
      return;
    }

    const previewURL = URL.createObjectURL(files[0]);

    setPreview(previewURL);
  }

  return (
    <Container>
      <ImagePreviewContainer>
        {imagePath ? (
          <img
            src={`http://localhost:3333/tmp/${imagePath}`}
            alt=""
            className="preview"
          />
        ) : preview ? (
          <img src={preview} alt="" className="preview" />
        ) : (
          <img src={imagePlaceholder} alt="" />
        )}
      </ImagePreviewContainer>

      <input
        type="file"
        name="image"
        id="image"
        accept="image/*"
        onChange={handleFileSelected}
      />
    </Container>
  );
}
