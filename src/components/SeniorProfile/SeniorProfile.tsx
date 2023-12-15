import React, { useEffect, useState } from 'react';
import {
  SeniorProfileBox,
  SeniorProfileContent,
  SeniorProfileImg,
  SeniorProfileInfo,
  SPmajor,
  SPnickname,
  SPField,
  Skeyword
} from './SeniorProfile.styled';
import { SeniorProfileProps } from '@/types/profile/seniorProfile';
function SeniorProfile({ data }: SeniorProfileProps) {
  // const { getAccessToken } = useAuth();
  // const [data, setData] = useState('');
  // const field = useAtomValue(sfactiveTabAtom);
  // const postgradu = useAtomValue(suactiveTabAtom);
  // console.log(postgradu)
  // useEffect(() => {
  //   const Token = getAccessToken();
  //   const headers = {
  //     Authorization: `Bearer ${Token}`,
  //   };

  //   if (field && postgradu) {
  //     axios
  //       .get(`${process.env.NEXT_PUBLIC_SERVER_URL}/senior/field?field=${field}&postgradu=${postgradu}`, { headers })
  //       .then((res) => {
  //         setData(res.data.data.seniorSearchResponses);
  //         console.log(res.data.data.seniorSearchResponses);
  //       })
  //       .catch((err) => {
  //         console.error(err);
  //       });
  //   }
  // }, [field, postgradu]);
  return (
    <SeniorProfileBox>
      <SeniorProfileContent>
        <SeniorProfileImg>프로필</SeniorProfileImg>
        <SeniorProfileInfo>
          <SPmajor>전공</SPmajor>
          <SPnickname>이름</SPnickname>
          <SPField>연구 분야</SPField>
        </SeniorProfileInfo>
        <Skeyword>키워드</Skeyword>
      </SeniorProfileContent>
    </SeniorProfileBox>
  );
}

export default SeniorProfile;
