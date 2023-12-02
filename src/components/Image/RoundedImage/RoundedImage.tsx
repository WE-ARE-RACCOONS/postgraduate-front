import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { RoundedImgContainer } from './RoundedImage.styled';

function RoundedImage({
  imgSrc,
  altMsg,
}: {
  imgSrc: StaticImport;
  altMsg: string;
}) {
  return (
    <RoundedImgContainer>
      <Image id="rounded-img" src={imgSrc} alt={altMsg} />
    </RoundedImgContainer>
  );
}

export default RoundedImage;
