import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { RoundedImgContainer } from './RoundedImage.styled';

function RoundedImage({
  imgSrc,
  altMsg,
}: {
  imgSrc: StaticImport | string;
  altMsg: string;
}) {
  return (
    <RoundedImgContainer>
      <Image
        id="rounded-img"
        src={imgSrc}
        alt={altMsg}
        width={72}
        height={72}
      />
    </RoundedImgContainer>
  );
}

export default RoundedImage;
