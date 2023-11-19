import NicknameForm from '@/components/SingleForm/NicknameForm';
import ServiceCondition from '@/components/ServiceCondition';
import NextBtn from '@/components/Button/NextBtn';
import PhoneNumForm from '@/components/SingleForm/PhoneNumForm';

function CommonInfoPage() {
  return (
    <div>
      <NicknameForm />
      <PhoneNumForm />
      <ServiceCondition />
      <NextBtn kind="next" url="/matching-info" />
    </div>
  )
}

export default CommonInfoPage;