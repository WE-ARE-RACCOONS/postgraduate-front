import { MBestCaseContainer } from './MBestCaseContent.styled';
import Image from 'next/image';
import bestCase from '@/../../public/best_sample.png'
import x_icon from '../../../../public/x.png';
import user_img from '../../../../public/user.png';
import RoundedImage from '@/components/Image/RoundedImage';
import DividedText from '@/components/Text/DividedText';
import AuthLabeledText from '@/components/Text/AuthLabeledText';
import BorderedText from '@/components/Text/BorderedText';
import TextField from '@/components/Text/TextField';

function MBestCaseContent({ modalHandler }: { modalHandler: () => void }) {
  return (
    <MBestCaseContainer>
      <Image
      src={bestCase}
      alt='bestCase'
      width={360}
      height={885}/>
    </MBestCaseContainer>
  );
}

export default MBestCaseContent;
