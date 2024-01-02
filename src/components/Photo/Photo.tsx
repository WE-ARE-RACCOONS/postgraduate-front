import Image from 'next/image';
import camera from '@../../../public/check.png';
function Photo({
  handler,
}: {
  handler: React.Dispatch<React.SetStateAction<File | null>>;
}) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handler(e.currentTarget.files ? e.currentTarget.files[0] : null);
  };

  return (
    <label htmlFor="photo-upload" style={{ cursor: 'pointer' }}>
      <Image
        src={camera}
        alt="camera"
        style={{ width: '32px', height: '32px', objectFit: 'cover' }}
      />
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
