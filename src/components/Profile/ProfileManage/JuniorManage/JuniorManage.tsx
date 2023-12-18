import { JuniorManageContainer } from './JuniorManage.styled';
import ContentComponent from '../../Box/ContentBox';
import TitleComponent from '../../Box/TitleBox';
import { useRouter } from 'next/navigation';
import { NotSeniorProps } from '@/types/modal/mypage';
import useAuth from '@/hooks/useAuth';
import { useAtom } from 'jotai';
import { socialIdAtom } from '@/stores/signup';
import { userType } from '@/types/user/user';
import axios from 'axios';
import { USER_TYPE } from '@/constants/user/cUser';
function JuniorManage(props: NotSeniorProps) {
  const router = useRouter();
  const handleProfileEditClick = () => {
    router.push('/mypage/edit');
  };
  const { getAccessToken } = useAuth();
  const [socialId, setSocialId] = useAtom(socialIdAtom);
  const handleClick = async () => {
    try {
      const Token = getAccessToken();
      if (Token) {
        const headers = {
          Authorization: `Bearer ${Token}`,
        };
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/user/me/role`,
          { headers },
        );
        if (response.data.data.possible === true) {
        }
        if (response.data.data.possible === false) {
          setSocialId(response.data.data.socialId);
          props.modalHandler();
        }
      }
    } catch (error) {
      console.error('Error fetching data from the server:', error);
    }
  };
  console.log(socialId);
  return (
    <JuniorManageContainer>
      <TitleComponent title="회원 상태 변경" />
      <ContentComponent
        content="내 정보 수정"
        onClick={handleProfileEditClick}
      />
      <ContentComponent
        content="대학원선배 회원으로 변경"
        onClick={handleClick}
      />
    </JuniorManageContainer>
  );
}

export default JuniorManage;
