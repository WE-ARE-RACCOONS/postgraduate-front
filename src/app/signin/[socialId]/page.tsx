import NicknameForm from '@/components/SingleForm/NicknameForm';
import ServiceCondition from '@/components/ServiceCondition';
import NextBtn from '@/components/Button/NextBtn';

function SigninPage() {
  return (
    <div>
      <NicknameForm />
      <ServiceCondition />
      <NextBtn kind='next' url='/matching-info' />
    </div>
  )
}

export default SigninPage;
