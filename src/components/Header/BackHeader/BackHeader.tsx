import { BackHeaderContainer } from './BackHeader.styled';
import Image from 'next/image';
import back_arrow from '../../../../public/arrow.png';
import { useRouter } from 'next/navigation';
interface BackHeaderProps {
  headerText: string;
  kind?: string;
}
function BackHeader({ headerText , kind}: BackHeaderProps) {
  const router = useRouter();

  return (
    <BackHeaderContainer>
      <Image
        id="back-arrow-img"
        src={back_arrow}
        alt="뒤로가기 화살표"
        onClick={() => {
          if(kind === 'select'){
            router.push('/')
          }
          else{router.back();}
          
        }}
      />
      <div id="header-text">{headerText}</div>
    </BackHeaderContainer>
  );
}

export default BackHeader;
