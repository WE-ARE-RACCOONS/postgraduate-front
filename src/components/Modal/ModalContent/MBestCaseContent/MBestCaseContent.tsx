import { MBestCaseContainer } from './MBestCaseContent.styled';
import Image from 'next/image';
import bestCase from '@/../../public/best_sample.png';
import BackHeader from '@/components/common/Header/BackHeader';

function MBestCaseContent({ modalHandler }: { modalHandler: () => void }) {
  return (
    <MBestCaseContainer>
      <BackHeader
        headerText="프로필 예시"
        kind="modal"
        modalHandler={modalHandler}
      />
      <Image src={bestCase} alt="bestCase" width={360} height={885} />
    </MBestCaseContainer>
  );
}

export default MBestCaseContent;
