import {
  sFieldAtom,
  totalFieldAtom,
  selectedFieldAtom,
  totalKeywordAtom,
  selectedKeywordAtom,
  sLabAtom,
  sKeywordAtom,
  sAbleTime,
  sChatLink,
  sMultiIntroduce,
  sRecommendedFor,
  sSingleIntroduce,
} from '@/stores/senior';

import { useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { seniorProfileFetch } from '@/api/user/profile/getSeniorProfile';
import { useRouter } from 'next/navigation';
import { updateSeniorProfile } from '@/api/user/profile/updateSeniorProfile';

const useSEdit = () => {
  const [allFieldValid, setAllFieldValid] = useState(false);
  const [singleIntro, setSingleIntro] = useAtom(sSingleIntroduce);
  const [multiIntro, setMultiIntro] = useAtom(sMultiIntroduce);
  const [recommended, setRecommended] = useAtom(sRecommendedFor);
  const [chatLink, setChatLink] = useAtom(sChatLink);
  const [sField, setSfield] = useAtom(sFieldAtom);
  const [totalField, setTotalField] = useAtom(totalFieldAtom);
  const [selectedField, setSelectedField] = useAtom(selectedFieldAtom);
  const [totalKeyword, setTotalKeyword] = useAtom(totalKeywordAtom);
  const [selectedKeyword, setSelectedKeyword] = useAtom(selectedKeywordAtom);
  const [sLab, setSlab] = useAtom(sLabAtom);
  const [sKeyword, setSkeyword] = useAtom(sKeywordAtom);
  const [timeData, setTimeData] = useAtom(sAbleTime);

  const router = useRouter();

  const checkAllFieldIsValid = () => {
    return (
      sField?.trim() !== '' &&
      singleIntro?.trim() !== '' &&
      multiIntro?.trim() !== '' &&
      recommended?.trim() !== '' &&
      chatLink?.trim() !== '' &&
      sLab?.trim() !== '' &&
      sKeyword?.trim() !== '' &&
      timeData.length === 3
    );
  };

  const fetchSProfileInfo = async () => {
    try {
      const { data } = await seniorProfileFetch();
      const seniorInfoData = data.data;

      const tempFields = [...totalField];
      seniorInfoData.field.forEach((el) => {
        if (!tempFields.includes(el)) {
          tempFields.push(el);
        }
      });

      setTimeData(seniorInfoData.times ? seniorInfoData.times : []);
      setTotalField(tempFields);
      setSelectedField(seniorInfoData.field);
      setTotalKeyword(seniorInfoData.keyword);
      setSelectedKeyword(seniorInfoData.keyword);
      setSfield(seniorInfoData.field.join(','));
      setSkeyword(seniorInfoData.keyword.join(','));
      setChatLink(seniorInfoData.chatLink ? seniorInfoData.chatLink : '');
      setMultiIntro(seniorInfoData.info ? seniorInfoData.info : '');
      setSingleIntro(seniorInfoData.oneLiner ? seniorInfoData.oneLiner : '');
      setRecommended(seniorInfoData.target ? seniorInfoData.target : '');
      setSlab(seniorInfoData.lab);
    } catch (e) {
      console.error(e);
    }
  };

  const handleClickConfirmBtn = async () => {
    await updateSeniorProfile({
      lab: sLab,
      keyword: sKeyword,
      info: multiIntro,
      target: recommended,
      chatLink: chatLink,
      field: sField,
      oneLiner: singleIntro,
      times: timeData,
    }).then(() => {
      router.refresh();
    });
  };

  useEffect(() => {
    fetchSProfileInfo();
  }, []);

  useEffect(() => {
    setAllFieldValid(checkAllFieldIsValid());
  }, [
    sField,
    singleIntro,
    multiIntro,
    recommended,
    chatLink,
    sLab,
    sKeyword,
    timeData,
  ]);
  return {
    singleIntro,
    setSingleIntro,
    multiIntro,
    setMultiIntro,
    recommended,
    allFieldValid,
    setRecommended,
    chatLink,
    setChatLink,
    sField,
    setSfield,
    totalField,
    selectedField,
    totalKeyword,
    selectedKeyword,
    sLab,
    setSlab,
    sKeyword,
    setSkeyword,
    timeData,
    setTimeData,
    checkAllFieldIsValid,
    fetchSProfileInfo,
    handleClickConfirmBtn,
  };
};

export default useSEdit;
