import { AuthLabeledContainer } from './AuthLabeled.styled';
import Image from 'next/image';
import auth_mark from '../../../../public/auth_mark.png';

type Props = {
  str: string;
  certification: boolean;
};
function AuthLabeledText({ str, certification }: Props) {
  return (
    <AuthLabeledContainer>
      <div id="auth-labeled-str">{str}</div>
      {certification?  <Image id="auth-mark-icon" src={auth_mark} alt="대학원생 인증 마크" /> :''}
    </AuthLabeledContainer>
  );
}

export default AuthLabeledText;
