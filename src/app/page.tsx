'use client';
import MenuBar from '../components/Bar/MenuBar';
import { useEffect } from 'react';
import usePrevPath from '../hooks/usePrevPath';
import styled from 'styled-components';
import SeniorProfile from '../components/SeniorProfile/SeniorProfile';
import FieldTapBar from '../components/Bar/FieldTapBar/FieldTapBar';
import UnivTapBar from '../components/Bar/UnivTapBar/UnivTapBar';
import SwiperComponent from '../components/Swiper/Swiper';
import useModal from '../hooks/useModal';
import DimmedModal from '../components/Modal/DimmedModal';
import SearchModal from '../components/Modal/SearchModal';
import { sfactiveTabAtom, suactiveTabAtom } from '../stores/tap';
import axios from 'axios';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';

import LogoLayer from '@/components/LogoLayer/LogoLayer';
import { listDataAtom, pageNumAtom } from '@/stores/home';
import Footer from '@/components/Footer';

import useTutorial from '@/hooks/useTutorial';
import { overlay } from 'overlay-kit';

export default function Home() {
  const { setCurrentPath } = usePrevPath();
  const [data, setData] = useAtom(listDataAtom);
  const [page, setPage] = useAtom(pageNumAtom);
  const { isTutorialFinish } = useTutorial();

  const field = useAtomValue(sfactiveTabAtom);
  const postgradu = useAtomValue(suactiveTabAtom);

  useEffect(() => {
    setPage(1);
    if (field && postgradu) {
      axios
        .get(
          `${process.env.NEXT_PUBLIC_SERVER_URL}/senior/field?field=${field}&postgradu=${postgradu}`,
        )
        .then((res) => {
          setData(res.data.data.seniorSearchResponses);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [field, postgradu]);

  useEffect(() => {
    setCurrentPath();

    const infiniteBottom = () => {
      let isScrollAtBottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 5;
      if (isScrollAtBottom) {
        axios
          .get(
            `${
              process.env.NEXT_PUBLIC_SERVER_URL
            }/senior/field?field=${field}&postgradu=${postgradu}&page=${
              page + 1
            }`,
          )
          .then((response) => {
            const res = response.data;
            if (res.code == 'SNR200') {
              setData((data) => [...data, ...res.data.seniorSearchResponses]);
              setPage((page) =>
                res.data.totalElements / 10 <= page ? page : page + 1,
              );
            }
          })
          .catch((err) => {
            console.error(err);
          });
      }
    };

    window.addEventListener('scroll', infiniteBottom);

    return () => {
      window.removeEventListener('scroll', infiniteBottom);
    };
  }, [page]);

  const { modal, modalHandler } = useModal('');

  const { modal: searchModal, modalHandler: searchModalHandler } = useModal('');

  return (
    <HomeLayer>
      <LogoLayer modalHandler={searchModalHandler} />
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
        {data && data.length > 0 ? (
          data.map((el, idx) => (
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
        <MenuBar modalHandler={modalHandler} />
      </MenuBarWrapper>

      {modal
        ? overlay.open(({ unmount }) => {
            return (
              <DimmedModal
                modalType="notuser"
                modalHandler={() => {
                  unmount();
                }}
              />
            );
          })
        : ''}
      {searchModal
        ? overlay.open(({ unmount }) => {
            return (
              <SearchModal
                modalHandler={() => {
                  unmount();
                }}
              />
            );
          })
        : ''}
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
