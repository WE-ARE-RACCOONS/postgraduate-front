import { StaticImport } from 'next/dist/shared/lib/get-img-props';
import Image from 'next/image';
import { RoundedImgContainer } from './RoundedImage.styled';

function RoundedImage({
  imgSrc,
  altMsg,
  kind,
}: {
  imgSrc: StaticImport | string;
  altMsg: string;
  kind?: string;
}) {
  return (
    <RoundedImgContainer>
      {kind === 'big' ? (
        <Image
          id="rounded-img"
          src={imgSrc}
          alt={altMsg}
          width={120}
          height={120}
        />
      ) : (
        <Image
          id="rounded-img"
          src={imgSrc}
          alt={altMsg}
          width={72}
          height={72}
        />
      )}
    </RoundedImgContainer>
  );
}

export default RoundedImage;
