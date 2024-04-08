import { PAY_AMOUNT_MODAL } from '@/constants/pay/payAmount';
import {
  PayAmountBtnBox,
  PayAmountContainer,
  PayAmountDescBox,
} from './PayAmount.styled';
import Image from 'next/image';
import pay_amount from '../../../../public/pay_amount.png';
import { usePathname, useRouter } from 'next/navigation';

function PayAmount({ modalHandler }: { modalHandler: () => void }) {
  const router = useRouter();
  const currentPath = usePathname();
  const pathArr = currentPath.split('/');
  const seniorId = pathArr[2];

  const prevClick = () => {
    modalHandler();
  };

  const nextClick = () => {
    router.push(`/mentoring-apply/${seniorId}/schedule`);
  };

  return (
    <PayAmountContainer>
      <div id="pay-amount-title">{PAY_AMOUNT_MODAL.title}</div>
      <Image id="pay-amount-img" src={pay_amount} alt="19,900원 금액 사진" />
      <PayAmountDescBox>
        <div id="pay-amount-fir-desc">{PAY_AMOUNT_MODAL.firDesc}</div>
        <div className="pay-amount-bottom-desc">
          <div id="pay-amount-bold">{PAY_AMOUNT_MODAL.amount}</div>
          <div id="pay-amount-sec-desc">{PAY_AMOUNT_MODAL.secDesc}</div>
        </div>
      </PayAmountDescBox>
      <PayAmountBtnBox>
        <button
          className="pay-amount-btn"
          id="pay-amount-prev-btn"
          onClick={prevClick}
        >
          {PAY_AMOUNT_MODAL.prevBtn}
        </button>
        <button
          className="pay-amount-btn"
          id="pay-amount-next-btn"
          onClick={nextClick}
        >
          {PAY_AMOUNT_MODAL.nextBtn}
        </button>
      </PayAmountBtnBox>
    </PayAmountContainer>
  );
}

export default PayAmount;
