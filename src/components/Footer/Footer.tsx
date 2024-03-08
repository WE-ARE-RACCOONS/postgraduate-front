import Image from "next/image";
import footer from '../../../public/footer.png';

function Footer() {
  return(
    <Image src={footer} alt="푸터 이미지" width={360} height={188} />
  )
}

export default Footer;