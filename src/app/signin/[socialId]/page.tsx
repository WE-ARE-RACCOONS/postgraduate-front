import NicknameForm from '@/components/SingleForm/NicknameForm';
import ServiceCondition from '@/components/ServiceCondition';
import NextBtn from '@/components/Button/NextBtn';

function SigninPage() {
  return (
    <div>
      <NicknameForm />
      <ServiceCondition />
      <NextBtn />
    </div>
  )
}

export default SigninPage;
