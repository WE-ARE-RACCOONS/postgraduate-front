'use client';
import MenuBar from '@/components/Bar/MenuBar';
import Login from '@/components/kakao/login';
import { useEffect } from 'react';
import usePrevPath from '@/hooks/usePrevPath';
import styled from 'styled-components';
import SeniorProfile from '@/components/SeniorProfile/SeniorProfile';
import FieldTapBar from '@/components/Bar/FieldTapBar/FieldTapBar';
import UnivTapBar from '@/components/Bar/UnivTapBar/UnivTapBar';

export default function Home() {
  const { setCurrentPath } = usePrevPath();

  useEffect(() => {
    setCurrentPath();
  }, []);

  return (
      <HomeLayer>
      <HomeTopLayer>
      <Login />
      </HomeTopLayer>
      <HomeBannerLayer>배너 넣기</HomeBannerLayer>
      <HomeFieldLayer>
        <FieldTapBar/>
      </HomeFieldLayer>
      <HomeUnivLayer>
        <UnivTapBar/>
      </HomeUnivLayer>
      <HomeProfileLayer>
      {/* {data && data!.length !== 0
          ? data!.map((el, idx) => {
              return <SeniorProfile key={idx} data={el} />;
            })
          : '해당하는 선배가 없어요'} */}
           <SeniorProfile/>
      </HomeProfileLayer>
    <MenuBar />
    </HomeLayer>
  );
}


const HomeLayer = styled.div`
  width: inherit;
  border: 1px solid blue;
`;
const HomeTopLayer = styled.div`
  border: 1px solid black;
  height: 4rem;
`;
const HomeBannerLayer = styled.div`
  border: 1px solid black;
  height: 6.7rem;
`;
const HomeFieldLayer = styled.div`
  border: 1px solid black;
  height: 4.9rem;
`;
const HomeUnivLayer = styled.div`
  border: 1px solid black;
  height: 4.1rem;
`;
const HomeProfileLayer = styled.div`
  border: 1px solid black;

`;