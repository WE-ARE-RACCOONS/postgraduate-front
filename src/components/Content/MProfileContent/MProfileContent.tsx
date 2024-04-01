import x_icon from '../../../../public/x_gray.png';
import Image from 'next/image';
import { MProfileBtn, MProfileContainer } from './MProfileContent.styled';
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
  };

  return (
    <>
      <Image
        id="x-icon"
        src={x_icon}
        alt="닫기 버튼"
        sizes="(max-width: 600px) 3.rem"
        width={21}
        height={21}
        style={{ marginLeft: '18.25rem', marginTop: '1rem', cursor: 'pointer' }}
        priority
        onClick={xClick}
      />
      <MProfileContainer>
        <div id='profile-cancle-ask-msg'>{`프로필 등록을\n취소하시겠어요?`}</div>
        <div id="profile-guide-msg">
          프로필을 지금 작성하지 않으면
          <br />
          멘토링을 진행할 수 없어요.
        </div>
      </MProfileContainer>
      <MProfileBtn id='profile-btn' onClick={handleClick}>
        프로필 등록하기
      </MProfileBtn>
    </>
  );
}

export default MProfileContent;
