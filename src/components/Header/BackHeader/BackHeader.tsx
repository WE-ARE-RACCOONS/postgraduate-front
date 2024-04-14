import { BackHeaderContainer } from './BackHeader.styled';
import Image from 'next/image';
import back_arrow from '../../../../public/arrow.png';
import { useRouter } from 'next/navigation';
interface BackHeaderProps {
  headerText: string;
  kind?: string;
  modalHandler?: () => void;
}
function BackHeader({ headerText, kind , modalHandler }: BackHeaderProps) {
  const router = useRouter();

  return (
    <BackHeaderContainer>
      <Image
        id="back-arrow-img"
        src={back_arrow}
        alt="뒤로가기 화살표"
        onClick={() => {
          if (kind === 'home') {
            router.push('/');
          }else if(kind === 'modal'){
            if (modalHandler) {
              modalHandler();
            }
          } 
          else {
            router.back();
          }
        }}
      />
      <div id="header-text">{headerText}</div>
    </BackHeaderContainer>
  );
}

export default BackHeader;
