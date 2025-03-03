'use client';

import Image from 'next/image';
import { Suspense, useEffect } from 'react';
import { useSeniorListPageSearchParams } from '@/hooks/search-params/useSeniorListSearchParams';

import { DropdownProvider } from '../DropDown/common/useDropdown';
import UnivTapBar from '@/components/Bar/UnivTapBar/UnivTapBar';
import SwiperComponent from '@/components/Swiper/Swiper';
import dynamic from 'next/dynamic';

// 동적 import
const DimmedModal = dynamic(() => import('@/components/Modal/DimmedModal'));
const SearchModal = dynamic(() => import('@/components/Modal/SearchModal'));
const MenuBar = dynamic(() => import('@/components/Bar/MenuBar'));
const SeniorListPagination = dynamic(
  () => import('../Pagination/SeniorListPagination'),
);

import Footer from '../Footer';
import SeniorProfile from '@/components/SeniorProfile/SeniorProfile';

import { sfactiveTabAtom, suactiveTabAtom } from '@/stores/tap';
import { useAtomValue } from 'jotai';

import { useGetSeniorListQuery } from '@/hooks/query/useGetSeniorListQuery';

import LogoLayer from '@/components/LogoLayer/LogoLayer';

import useTutorial from '@/hooks/useTutorial';
import { overlay } from 'overlay-kit';
import Link from 'next/link';
import FieldTapBar from '../Bar/FieldTapBar/FieldTapBar';

export function SeniorList() {
  const { isTutorialFinish } = useTutorial();

  const field = useAtomValue(sfactiveTabAtom);
  const postgradu = useAtomValue(suactiveTabAtom);

  const { page, setPage } = useSeniorListPageSearchParams();

  useEffect(() => {
    setPage(1);
  }, [field, postgradu]);

  const { data: seniorListData } = useGetSeniorListQuery(
    field,
    postgradu,
    page,
  );

  return (
    <div className="h-full pb-14">
      <LogoLayer
        modalHandler={() => {
          overlay.open(({ unmount }) => {
            return <SearchModal modalHandler={() => unmount()} />;
          });
        }}
      />
      <div className="h-28 px-4">
        <SwiperComponent />
      </div>
      <DropdownProvider>
        <div className="mx-2 overflow-x-auto whitespace-nowrap">
          <FieldTapBar />
        </div>
        <div className="overflow-x-auto whitespace-nowrap border-t border-gray-300">
          <UnivTapBar />
        </div>
      </DropdownProvider>
      <div className="h-full min-h-[22rem] pb-4 pt-4">
        {seniorListData?.seniorSearchResponses?.length ? (
          seniorListData.seniorSearchResponses.map((el, idx) =>
            idx + 1 !== 5 ? (
              <div key={el.seniorId}>
                <SeniorProfile data={el} />
              </div>
            ) : page === 1 ? (
              <Link href={'/apply-wanted-senior'} className="mx-auto flex">
                <Image
                  src="/Frame-39823.png"
                  alt="원하는 선배 신청 페이지로 이동하는 이미지"
                  aria-label="원하는 선배 신청 페이지로 이동하는 이미지"
                  role="link"
                  width={360}
                  height={141}
                  title="원하는 선배 신청 페이지로 이동"
                />
              </Link>
            ) : (
              <div key={el.seniorId}>
                <SeniorProfile data={el} />
              </div>
            ),
          )
        ) : (
          <div className="flex min-h-[22rem] items-center justify-center">
            해당하는 선배가 없어요
          </div>
        )}

        <SeniorListPagination totalPage={seniorListData?.totalElements ?? 0} />
      </div>
      <Footer />
      <div className="fixed bottom-0 z-10 w-full">
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
      </div>
    </div>
  );
}
