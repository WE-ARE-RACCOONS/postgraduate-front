import Image from 'next/image';
import footer from '../../../public/footer.png';
import { TEMRS_LINK } from '@/constants/terms/terms';

function Footer() {
  return (
    <div>
      <img
        src={footer.src}
        alt="푸터 이미지"
        width={360}
        height={188}
        useMap="#image-map"
      />
      <map name="image-map">
        <area
          target="_blank"
          alt="이용약관"
          title="이용약관"
          href={TEMRS_LINK.termsOfUse}
          coords="9,145,81,163"
          shape="rect"
        />
        <area
          target="_blank"
          alt="개인정보"
          title="개인정보"
          href={TEMRS_LINK.privacyStatement}
          coords="94,145,166,164"
          shape="rect"
        />
      </map>
    </div>
  );
}

export default Footer;
