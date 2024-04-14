import { SMCancelSuccessAtom } from '@/stores/condition';
import { useAtomValue } from 'jotai';
import React from 'react';
import Image from 'next/image';
import acceptImage from '../../../../public/cState.png';
import acceptNonImage from '../../../../public/state.png';
import { OkayBtn, SuccessTop ,MCSub} from './SuccessFail.styled';

function SuccessFail({ modalHandler }: { modalHandler: () => void }) {
  const success = useAtomValue(SMCancelSuccessAtom);
  const handleModalClose = () => {
    modalHandler();
    location.reload();
  };
  return (
    <div>
      {success ? (
        <>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Image
              src={acceptImage}
              width={70}
              height={70}
              alt="멘토링 승인 축하 이미지"
            />
          </div>
          <div style={{}}>
          <SuccessTop>거절 성공</SuccessTop>
          <MCSub>멘토링 거절에 성공했습니다.</MCSub>
          <OkayBtn onClick={handleModalClose}>확인했어요</OkayBtn>
          </div>
        </>
      ) : (
        <>
          <div style={{ textAlign: 'center', marginTop: '1rem' }}>
            <Image
              src={acceptNonImage}
              width={70}
              height={70}
              alt="멘토링 승인 축하 이미지"
            />
          </div>
          <SuccessTop>거절 실패</SuccessTop>
          <MCSub>멘토링 거절에 실패했습니다.</MCSub>
          <OkayBtn onClick={handleModalClose}>확인했어요</OkayBtn>
        </>
      )}
    </div>
  );
}

export default SuccessFail;
