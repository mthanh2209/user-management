import { ChangeEvent, useState } from 'react';

// CSS
import '@components/Inputs/ImageUploader/ImageUploader.css';

// Components
import Avatar from '@components/DataDisplay/Avatar';

// Helpers
import { convertToDataURL } from '@helpers';

// Icons
import uploadIcon from '@assets/images/upload-icon.svg';

//Constants
import { VALIDATION_MESSAGE } from '@constants';

interface IImageUploaderProps {
  initialImage: string;
  alt: string;
  bgColor: string;
  buttonContent?: string;
  icon?: string;
  onChange: (data: string) => void;
}
const ImageUploader = ({
  initialImage,
  alt,
  bgColor,
  buttonContent = 'Upload new photo',
  icon = uploadIcon,
  onChange
}: IImageUploaderProps) => {
  const [uploadImage, setUploadImage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const inputFile = event.target.files?.[0];

    if (!inputFile) return;

    const fileSize = inputFile.size;
    const fileType = inputFile.type;

    const maxSizeAllowed = 1 * 1024 * 1024;
    const allowedFileTypes = ['image/jpeg', 'image/png'];

    if (fileSize > maxSizeAllowed || !allowedFileTypes.includes(fileType)) {
      setErrorMessage(VALIDATION_MESSAGE.INVALID_IMAGE);
      return;
    }

    const imageDataURL = await convertToDataURL(inputFile);

    if (imageDataURL) {
      setUploadImage(imageDataURL as string);
      onChange(imageDataURL as string);
      setErrorMessage('');
    }
  };

  return (
    <div className='uploader-wrapper'>
      <div className='uploader'>
        <Avatar
          src={uploadImage != null ? uploadImage : initialImage}
          alt={alt}
          bgColor={bgColor}
          size='lg'
        />

        <label className='uploader-button' htmlFor='button-upload-image'>
          <span>
            <img className='uploader-icon' src={icon} alt='icon' />
          </span>
          {buttonContent}
        </label>

        <input
          className='input-uploader'
          type='file'
          accept='image/*'
          id='button-upload-image'
          onChange={handleImageUpload}
        />
      </div>

      {errorMessage && <span className='error-message'>{errorMessage}</span>}
    </div>
  );
};

export default ImageUploader;
