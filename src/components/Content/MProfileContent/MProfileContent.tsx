import x_icon from '../../../../public/x.png';
import Image from 'next/image';
import { MProfileContainer } from './MProfileContent.styled';
import ClickedBtn from '@/components/Button/ClickedBtn';
import { MProfileContentProps } from '@/types/content/mProfileContent';
import { useRouter } from 'next/navigation';

function MProfileContent(props: MProfileContentProps) {
  const router = useRouter();

  const handleClick = () => {
    props.modalHandler();
    router.push('/add-profile');
  };

  const xClick = () => {
    props.modalHandler();
    router.push('/add-profile');
  };

  return (
    <>
      <Image
        id="x-icon"
        src={x_icon}
        alt="닫기 버튼"
        sizes="(max-width: 600px) 3.rem"
        width={36}
        height={36}
        style={{ marginLeft: '18.25rem', marginTop: '1rem' }}
        priority
        onClick={xClick}
      />
      <MProfileContainer>
        <h3>프로필 등록을 취소하시겠어요?</h3>
        <div id="profile-guide-msg">
          프로필을 작성하지 않으면
          <br />
          멘토링을 진행할 수 없어요
        </div>
      </MProfileContainer>
      <ClickedBtn
        kind="modal"
        clickHandler={handleClick}
        btnText="프로필 등록하기"
      />
    </>
  );
}

export default MProfileContent;
