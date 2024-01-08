import Image from 'next/image';
import camera from '@../../../public/check.png';
import { AuthImgBtn } from './Photo.styled';
import upload from '@../../../public/upload.png';
type PhotoProps = {
  handler: React.Dispatch<React.SetStateAction<File | null>>;
  type: 'camera' | 'auth'; // 타입 추가
};
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
          style={{ width: '32px', height: '32px', objectFit: 'cover' }}
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
