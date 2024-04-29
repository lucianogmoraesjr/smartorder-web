import { ChangeEvent, InputHTMLAttributes, forwardRef, useState } from 'react';

import imagePlaceholder from '../../assets/images/image-placeholder.svg';

import { Container, ImagePreviewContainer } from './styles';

interface ImagePickerProps extends InputHTMLAttributes<HTMLInputElement> {
  imagePath?: string;
}

export const ImagePicker = forwardRef<HTMLInputElement, ImagePickerProps>(
  ({ imagePath, ...props }, ref) => {
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
          {imagePath && !preview ? (
            <img src={imagePath} alt="" className="preview" />
          ) : preview ? (
            <img src={preview} alt="" className="preview" />
          ) : (
            <img src={imagePlaceholder} alt="" />
          )}
        </ImagePreviewContainer>

        <input
          ref={ref}
          type="file"
          name="image"
          id="image"
          accept="image/*"
          {...props}
          onChange={handleFileSelected}
        />
      </Container>
    );
  },
);
