import { JuniorManageContainer } from './JuniorManage.styled';
import ContentComponent from '../../Box/ContentBox';
import TitleComponent from '../../Box/TitleBox';
import { useRouter } from 'next/navigation';
import { NotSeniorProps } from '@/types/modal/mypage';

import { useAtom, useSetAtom } from 'jotai';
import { socialIdAtom, userTypeAtom } from '@/stores/signup';

import { usePostRenewSeniorToken } from '@/hooks/mutations/usePostRenewSeniorToken';
import { useGetMyRoleQuery } from '@/hooks/query/useGetMyRole';

function JuniorManage(props: NotSeniorProps) {
  const router = useRouter();
  const { data: myRole } = useGetMyRoleQuery();
  const renewSeniorToken = usePostRenewSeniorToken();
  const handleProfileEditClick = () => {
    router.push('/mypage/edit');
  };
  const setuserTypeAtom = useSetAtom(userTypeAtom);

  const [_socialId, setSocialId] = useAtom(socialIdAtom);

  const handleClick = async () => {
    renewSeniorToken.mutate();
    setuserTypeAtom('junior');
    router.replace('/');
    setSocialId(myRole?.data?.socialId + '');
  };

  return (
    <JuniorManageContainer>
      <TitleComponent title="계정 관리" />
      <ContentComponent content="계정 설정" onClick={handleProfileEditClick} />
      <ContentComponent
        content="대학원 선배 회원으로 변경"
        onClick={handleClick}
      />
      <ContentComponent
        content="탈퇴하기"
        onClick={() => router.push('/signout')}
      />
    </JuniorManageContainer>
  );
}

export default JuniorManage;
