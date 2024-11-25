export const WISH_SENIOR_MENTOR_MSG = {
  INFO: {
    TITLE: '멘토링을 원하는 선배에 대해 알려주세요',
    SUB_TITLE: `대학원 김선배가 원하는 선배를 \n빠르게 만날 수 있도록 도와드릴게요!`,
  },
  FIELD: {
    TITLE: '어떤 분야에 관심 있는지 알려주세요',
    SUB_TITLE: '* 궁금한 학교가 정해져 있지 않다면 비워둬도 괜찮아요',
  },
  POSTGRADU: {
    TITLE: '궁금한 선배의 학교를 알려주세요',
    SUB_TITLE: '* 궁금한 학교가 정해져 있지 않다면 비워둬도 괜찮아요',
  },
  LAB: {
    TITLE: '궁금하나 대학원의 랩실명을 알려주새요',
    SUB_TITLE: '* 궁금한 랩실이 정해져 있지 않다면 비워둬도 괜찮아요',
  },
  PHONE: {
    TITLE: '선배 알림을 받을 연락처를 알려주세요',
    SUB_TITLE: '* 선배를 찾으면 알려주신 정보로 연락드릴게요',
  },
} as const;

export const WISH_SENIOR_PROVIDER_FIELD_LIST = [
  'UX/UI',
  '데이터 사이언스',
  '산업 공학',
  'AI',
];

export const WISH_SENIOR_FIELD_ETC = '기타(직접 입력)' as const;
