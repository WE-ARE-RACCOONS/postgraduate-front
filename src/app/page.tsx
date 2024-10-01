'use client';
import MenuBar from '../components/Bar/MenuBar';
import { useEffect } from 'react';
import usePrevPath from '../hooks/usePrevPath';
import styled from 'styled-components';
import SeniorProfile from '../components/SeniorProfile/SeniorProfile';
import FieldTapBar from '../components/Bar/FieldTapBar/FieldTapBar';
import UnivTapBar from '../components/Bar/UnivTapBar/UnivTapBar';
import SwiperComponent from '../components/Swiper/Swiper';
import DimmedModal from '../components/Modal/DimmedModal';
import SearchModal from '../components/Modal/SearchModal';
import { sfactiveTabAtom, suactiveTabAtom } from '../stores/tap';
import { useAtomValue } from 'jotai';

import { useGetSeniorListQuery } from '@/hooks/query/useGetSeniorListQuery';
import LogoLayer from '@/components/LogoLayer/LogoLayer';
import Footer from '@/components/Footer';

import useTutorial from '@/hooks/useTutorial';
import { overlay } from 'overlay-kit';

export default function Home() {
  const { setCurrentPath } = usePrevPath();
  const { isTutorialFinish } = useTutorial();

  const field = useAtomValue(sfactiveTabAtom);
  const postgradu = useAtomValue(suactiveTabAtom);

  const {
    data: seniorListData,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useGetSeniorListQuery(field, postgradu);

  useEffect(() => {
    setCurrentPath();

    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 5 &&
        hasNextPage &&
        !isFetchingNextPage
      ) {
        fetchNextPage();
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  const seniorList =
    seniorListData?.pages.flatMap(
      (page) => page.data.data.seniorSearchResponses,
    ) || [];

  return (
    <HomeLayer>
      <LogoLayer
        modalHandler={() => {
          overlay.open(({ unmount }) => {
            return <SearchModal modalHandler={() => unmount()} />;
          });
        }}
      />
      <HomeBannerLayer>
        <SwiperComponent />
      </HomeBannerLayer>
      <HomeFieldLayer>
        <FieldTapBar />
      </HomeFieldLayer>
      <HomeUnivLayer>
        <UnivTapBar />
      </HomeUnivLayer>
      <HomeProfileLayer>
        {seniorList.length > 0 ? (
          seniorList.map((el, idx) => (
            <div key={idx}>
              <SeniorProfile data={el} />
            </div>
          ))
        ) : (
          <div>해당하는 선배가 없어요</div>
        )}
      </HomeProfileLayer>
      <Footer />
      <MenuBarWrapper>
        <MenuBar
          modalHandler={() => {
            overlay.open(({ unmount }) => {
              return (
                <DimmedModal
                  modalType="notuser"
                  modalHandler={() => unmount()}
                />
              );
            });
          }}
        />
      </MenuBarWrapper>
    </HomeLayer>
  );
}

const HomeLayer = styled.div`
  width: inherit;
  height: inherit;
  padding-bottom: 3.5rem;
`;

const HomeBannerLayer = styled.div`
  height: 6.7rem;
  padding: 0 1rem;
`;
const HomeFieldLayer = styled.div`
  margin: 0 0.5rem;
  overflow-x: auto;
  white-space: nowrap;
`;
const HomeUnivLayer = styled.div`
  border-top: 1px solid #c2cede;
  overflow-x: auto;
  white-space: nowrap;
  padding: 1rem 0.9rem;
`;
const HomeProfileLayer = styled.div`
  min-height: 22rem;
  height: inherit;
  padding: 1rem;
`;
const MenuBarWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: inherit;
  z-index: 1;
`;
