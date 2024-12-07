import {
  SMPContainer,
  SMPInfoBox,
  SMPInfoTextBox,
  SMPIntroDesc,
  SMPIntroduceBox,
  SMPLabBox,
  SMPLabKeywordBox,
  EditBtn,
} from './SeniorMyProfile.styled';
import Image from 'next/image';
import x_icon from '../../../../../public/x.png';
import user_icon from '../../../../../public/user.png';
import RoundedImage from '@/components/common/RoundedImage';
import AuthLabeledText from '@/components/common/Text/AuthLabeledText';
import DividedText from '@/components/common/Text/DividedText';
import BorderedText from '@/components/common/Text/BorderedText';
import TextField from '@/components/common/Text/TextField';
import { useAtomValue } from 'jotai';
import { mySeniorId } from '@/stores/senior';
import { useEffect, useState } from 'react';
import axios from 'axios';
import NextBtn from '@/components/common/Button/NextBtn';

function SeniorMyProfile({ modalHandler }: { modalHandler: () => void }) {
  const [flag, setFlag] = useState(false); // 예외처리용 flag
  const [info, setInfo] = useState('');
  const [keyword, setKeyword] = useState<Array<string>>([]);
  const [lab, setLab] = useState('');
  const [major, setMajor] = useState('');
  const [nickName, setNickName] = useState('');
  const [oneLiner, setOneLiner] = useState('');
  const [postgradu, setPostgradu] = useState('');
  const [professor, setProfessor] = useState('');
  const [profile, setProfile] = useState(''); // 사진 형식 유의
  const [target, setTarget] = useState('');
  const [time, setTime] = useState('');
  const seniorId = useAtomValue(mySeniorId);

  useEffect(() => {
    if (seniorId !== 0) {
      axios
        .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/${seniorId}`)
        .then((response) => {
          const res = response.data;
          if (res.code == 'EX400') {
            setFlag(true);
            return;
          }

          if (res.code == 'SNR200') {
            setInfo(res.data.info);
            setKeyword(res.data.keyword);
            setLab(res.data.lab);
            setMajor(res.data.major);
            setNickName(res.data.nickName);
            setOneLiner(res.data.oneLiner);
            setPostgradu(res.data.postgradu);
            setProfessor(res.data.professor);
            setProfile(res.data.profile);
            setTarget(res.data.target);
            setTime(res.data.time);

            setFlag(true);
          }
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [seniorId]);

  return (
    <SMPContainer>
      <div>
        <h3 style={{ textAlign: 'center', marginTop: '0.7rem' }}>
          프로필 상세
        </h3>
        <Image
          id="x-icon"
          src={x_icon}
          alt="모달 닫기 버튼"
          onClick={modalHandler}
        />
      </div>
      {!flag && (
        <div>
          인증이 완료되지 않은 사용자는 프로필을 볼 수 없습니다!
          <br />
          만약 인증이 완료되었는데도 프로필이 보이지 않는다면,
          <br />
          고객센터에 문의해주세요!
        </div>
      )}
      {flag && (
        <div style={{ background: '#F1F3F5' }}>
          <SMPInfoBox>
            <RoundedImage imgSrc={user_icon} altMsg="선배 프로필 이미지" />
            <SMPInfoTextBox>
              <AuthLabeledText str={nickName} />
              {/* <div id='postgradu'>{postgradu} {major}</div> */}
              <DividedText firStr={postgradu} secStr={major} />
              <div>{professor}</div>
              <div id="mentoring-time-box">
                <div id="mentoring-text">멘토링</div>
                <div id="time-text">30분</div>
              </div>
            </SMPInfoTextBox>
          </SMPInfoBox>
          <SMPLabBox>
            <div id="lab-name-text">{lab}</div>
            <SMPLabKeywordBox>
              {keyword.length > 0 &&
                keyword.map((el, idx) => <BorderedText key={idx} str={el} />)}
            </SMPLabKeywordBox>
          </SMPLabBox>
          <hr id="profile-line" />
          <SMPIntroduceBox>
            <div id="profile-single-intro">{oneLiner}</div>
            <TextField content={info} />
            <div>
              <SMPIntroDesc>이런 분들께 추천드려요</SMPIntroDesc>
              <TextField content={target} />
            </div>
            <div>
              <SMPIntroDesc>멘토링 가능 일정</SMPIntroDesc>
              <TextField content={time} />
            </div>
          </SMPIntroduceBox>
          <EditBtn>
            <NextBtn
              kind="route"
              url="/senior/edit-profile"
              btnText="수정하기"
            />
          </EditBtn>
        </div>
      )}
    </SMPContainer>
  );
}

export default SeniorMyProfile;
