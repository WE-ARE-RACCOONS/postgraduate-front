import Image from 'next/image';
import footer from '../../../public/Footer.png';

function Footer() {
  return <div>
  <img src={footer.src} alt="푸터 이미지" width={360} height={188} useMap="#image-map" />
  <map name="image-map">
    <area
      target="_blank"
      alt="이용약관"
      title="이용약관"
      href="https://drive.google.com/file/d/1dbwxYelqqHrISAnsaaKysXD3TigerEIj/view?usp=sharing"
      coords="9,145,81,163"
      shape="rect"
    />
    <area
      target="_blank"
      alt="개인정보"
      title="개인정보"
      href="https://drive.google.com/file/d/1Ae4raDbSSRRbVEKG8_8gSVLCQ-8Zrfti/view?usp=sharing"
      coords="94,145,166,164"
      shape="rect"
    />
  </map>
</div>;
}

export default Footer;

