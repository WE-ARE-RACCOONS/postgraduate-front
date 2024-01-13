export interface Bank {
    name: string;
    imgSrc: string;
  }
export interface BankColumnItemProps {
    bank: Bank;
    onClick: () => void;
  }