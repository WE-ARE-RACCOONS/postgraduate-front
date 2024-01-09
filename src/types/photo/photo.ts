export type PhotoProps = {
    handler: React.Dispatch<React.SetStateAction<File | null>>;
    type: 'camera' | 'auth'; // 타입 추가
  };