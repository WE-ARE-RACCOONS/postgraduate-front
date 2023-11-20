'use client';
import NextBtn from "@/components/Button/NextBtn";
import PhotoForm from "@/components/SingleForm/PhotoForm";
import SingleValidator from "@/components/Validator/SingleValidator";

function AuthPage() {
  return(
    <div>
      <h3>대학원생임을 인증해주세요!</h3>
      <div>대학원 선배 회원으로 가입하면 멘토링을 진행할 수 있어요</div>
      <br />
      <div>대학원생임을 증명할 수 있는 사진을 첨부해주세요.<br />e.g. 대학원 학생증, 대학원 합격증, 연구실멤버 확인 캡쳐본</div>
      <PhotoForm />
      <div>첨부한 사진은 대학원 선배 회원 승인 후에 폐기됩니다.</div>
      <SingleValidator textColor="#FF0000" msg="카메라 버튼을 눌러 사진을 첨부해주세요" />
      <div>영업일 기준 48시간 안에 승인 여부를 알려드려요.</div>
      <NextBtn kind="next" url="/senior-info" btnText="다음" />
    </div>
  )
}

export default AuthPage;