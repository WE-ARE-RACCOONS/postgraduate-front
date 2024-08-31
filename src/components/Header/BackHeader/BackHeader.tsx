import { BackHeaderContainer } from './BackHeader.styled';
import Image from 'next/image';
import back_arrow from '../../../../public/arrow.png';
import { useRouter } from 'next/navigation';
interface BackHeaderProps {
  headerText: string;
  kind?: string;
  modalHandler?: () => void;
}
function BackHeader({ headerText, kind }: BackHeaderProps) {
  const router = useRouter();

  return (
    <div className="w-full h-14 flex items-center shadow-sm">
      <div className="basis-1/6 cursor-pointer">
        <Image
          className="mt-1"
          height={28}
          id="back-arrow-img"
          src={back_arrow}
          alt="뒤로가기 화살표"
          onClick={() => {
            if (kind === 'home') {
              router.push('/');

              return;
            }

            router.back();
          }}
        />
      </div>

      <div className="text-center basis-4/6 w-max h-6 text-[20px] font-semibold">
        {headerText}
      </div>
      <div className="basis-1/6"></div>
    </div>
  );
}

export default BackHeader;
