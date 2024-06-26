import Image from 'next/image';
import camera from '@../../../public/camera.png';
import { AuthImgBtn } from './Photo.styled';
import upload from '@../../../public/upload.png';
import { PhotoProps } from '@/types/photo/photo';
function Photo({ handler, type }: PhotoProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handler(e.currentTarget.files ? e.currentTarget.files[0] : null);
  };

  return (
    <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
      {type == 'camera' && (
        <Image
          src={camera}
          alt="camera"
          style={{
            marginLeft: '12.8rem',
            width: '32px',
            height: '32px',
            position: 'absolute',
          }}
        />
      )}
      {type == 'auth' && (
        <AuthImgBtn>
          <Image
            src={upload}
            alt="upload"
            style={{ width: '17px', height: '17px', objectFit: 'cover' }}
          />
          사진선택
        </AuthImgBtn>
      )}
      <input
        type="file"
        accept="image/*"
        id="photo-upload"
        style={{ display: 'none' }}
        onChange={(e) => {
          handleChange(e);
        }}
      />
    </label>
  );
}

export default Photo;
