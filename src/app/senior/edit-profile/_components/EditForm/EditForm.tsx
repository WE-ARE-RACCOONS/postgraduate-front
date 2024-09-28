'use client';

import React from 'react';
import { Plus } from 'lucide-react';

import { overlay } from 'overlay-kit';

import BackHeader from '@/components/Header/BackHeader';

import { PROFILE_PLACEHOLDER } from '@/constants/form/cProfileForm';

import { ErrorMessage } from '@/components/ErrorMessage';

import {
  useForm,
  FormProvider,
  useFieldArray,
  useWatch,
} from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useSeniorProfileQuery } from '@/services/senior/me/useSeniorProfileQuery';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/Input';
import { Textarea } from '@/components/Textarea';

import { SENIOR_PROFILE_DEFAULT_STATE } from '../../constants';
import { seniorProfileSchema } from '../../validator';
import { Label } from '@/components/ui/label';
import { getSeniorEditFormCleansingData } from '../../util';

import { TimeBottomSheet } from '../TimeBottomSheet';
import { FieldBottomSheet } from '../FieldBottomSheet';
import { KeywordBottomSheet } from '../KeywordBottomSheet';

import { seniorInfoPatchFetch } from '@/api/senior/me/seniorInfoPatchFetch';
import { getSeniorPatchFetchParamsCleansingData } from '../../util';

export type SeniorProfileFormType = yup.InferType<typeof seniorProfileSchema>;

const EditForm = () => {
  const { data } = useSeniorProfileQuery();

  const method = useForm({
    resolver: yupResolver(seniorProfileSchema),
    values: {
      ...SENIOR_PROFILE_DEFAULT_STATE,
      ...getSeniorEditFormCleansingData(data ?? {}),
    },
  });

  const {
    handleSubmit: submit,
    control,
    getValues,
    setError,
    watch,
    formState: { errors },
  } = method;

  const { remove } = useFieldArray({
    control,
    name: 'times',
  });

  const times = useWatch({
    control,
    name: 'times',
  });

  const handleSubmit = submit(async () => {
    const timesLength = times?.length || 0;

    if (timesLength < 3) {
      setError('times', { message: '* 최소 3개 이상 등록해주세요.' });

      return;
    }

    try {
      const editRes = await seniorInfoPatchFetch({
        isNext: true,
        ...getSeniorPatchFetchParamsCleansingData(getValues()),
      });

      console.log(editRes, '제발');
    } catch (error) {
      console.error(error);
    }
  });

  const handleFieldPickerOpen = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <FormProvider {...method}>
          <FieldBottomSheet isOpen={isOpen} onClose={close} />
        </FormProvider>
      );
    });
  };

  const handleKeywordPickerOpen = () => {
    overlay.open(({ isOpen, close }) => {
      return (
        <FormProvider {...method}>
          <KeywordBottomSheet isOpen={isOpen} onClose={close} />
        </FormProvider>
      );
    });
  };

  //TODO: middleware에서 제어해주기
  // useEffect(() => {
  //   if (!session?.accessToken) {
  //     console.log(session);
  //     router.push('/');
  //   }
  // }, []);

  return (
    <FormProvider {...method}>
      <BackHeader headerText="프로필 정보" />
      <div>
        <div className="my-10 mx-2 flex flex-col gap-3">
          <div className="mt-4">
            <Input
              name="lab"
              type="text"
              maxLength={30}
              placeholder="연구실 이름을 입력해주세요."
              label={
                <Label
                  htmlFor="lab"
                  className="block text-[#212529] font-semibold"
                >
                  <div id="lab">
                    연구실명
                    <span className="text-[#00a0e1] pl-0.5">*</span>
                  </div>
                </Label>
              }
            />
          </div>
          <div className="mt-4">
            <Input
              name="field"
              type="text"
              readOnly
              maxLength={30}
              placeholder="연구분야를 선택해주세요."
              label={
                <Label
                  htmlFor="lab"
                  className="flex justify-between items-center w-full text-[#212529] font-semibold"
                >
                  <div id="lab">
                    연구분야
                    <span className="text-[#00a0e1] pl-0.5">*</span>
                  </div>
                  <span
                    className="cursor-pointer underline text-[#00a0e1] font-light"
                    onClick={handleFieldPickerOpen}
                  >
                    수정
                  </span>
                </Label>
              }
            />
          </div>
          <div className="mt-4">
            <Input
              name="keyword"
              type="text"
              readOnly
              maxLength={30}
              placeholder="연구주제를 선택해주세요."
              label={
                <Label
                  htmlFor="lab"
                  className="flex justify-between items-center w-full text-[#212529] font-semibold"
                >
                  <div id="lab">
                    연구주제
                    <span className="text-[#00a0e1] pl-0.5">*</span>
                  </div>
                  <span
                    className="cursor-pointer underline text-[#00a0e1] font-light"
                    onClick={handleKeywordPickerOpen}
                  >
                    수정
                  </span>
                </Label>
              }
            />
          </div>
        </div>
        <div className=" flex flex-col gap-3">
          <div className="mx-2 ">
            <Textarea
              className="whitespace-pre-line"
              maxLength={100}
              name="oneLiner"
              placeholder={PROFILE_PLACEHOLDER.singleIntroduce}
              label={
                <Label
                  htmlFor="oneLiner"
                  className="flex justify-between items-center w-full text-[#212529] font-semibold"
                >
                  <div id="oneLiner">한 줄 소개</div>
                </Label>
              }
            />
            <span className="text-xs text-gray-400 font-light float-right inline-block mt-2">
              {watch('oneLiner')?.length ?? 0} / 100
            </span>
          </div>

          <div className="mx-2  mt-4">
            <Textarea
              className="h-48"
              name="info"
              maxLength={1000}
              placeholder={PROFILE_PLACEHOLDER.multiIntroduce}
              label={
                <Label
                  htmlFor="info"
                  className="flex justify-between items-center w-full text-[#212529] font-semibold"
                >
                  <div id="info">자기소개</div>
                </Label>
              }
            />
            <span className="text-xs text-gray-400 font-light float-right inline-block mt-2">
              {watch('info')?.length ?? 0} / 1000
            </span>
          </div>

          <div className="mx-2  mt-4">
            <Textarea
              className="h-48"
              maxLength={1000}
              name="target"
              placeholder={PROFILE_PLACEHOLDER.recommendMultiIntroduce}
              label={
                <Label
                  htmlFor="target"
                  className="flex justify-between items-center w-full text-[#212529] font-semibold"
                >
                  <div id="target">이런 후배에게 추천해요</div>
                </Label>
              }
            />
            <span className="text-xs text-gray-400 font-light float-right inline-block mt-2">
              {watch('target')?.length ?? 0} / 1000
            </span>
          </div>

          <div className="mx-2  mt-4">
            <Input
              name="chatLink"
              type="text"
              placeholder={PROFILE_PLACEHOLDER.addChatLink}
              label={
                <Label
                  htmlFor="chatLink"
                  className="flex flex-col justify-center items-start w-full text-[#212529] font-semibold"
                >
                  <div id="chatLink" className="">
                    연락 방법
                  </div>
                  <div id="mentoring-sub" className="text-xs font-light mt-2">
                    매칭된 후배와 대화할 오픈채팅 방이에요.
                    <br />
                    비대면 회의 링크나 급한 공지를 전달해요.
                  </div>
                </Label>
              }
            />
          </div>

          <div className="mx-2  mt-6">
            <Label
              htmlFor="times"
              className="flex flex-col justify-center items-start w-full text-[#212529] font-semibold"
            >
              <div id="times" className="w-full mb-2">
                가능한 멘토링 일정
                <span className="text-[#00a0e1] pl-2 text-xs font-light">
                  * 최소 3개이상 일정을 등록해주세요
                </span>
              </div>
              <div className="w-full flex flex-col gap-2">
                {times && times?.length <= 0 ? (
                  <div className="w-full pl-4 font-light flex items-center justify-between bg-[#f8f9fa] px-2 py-2 rounded-md">
                    <span>일정을 추가해주세요.</span>
                    <Button
                      onClick={() => {
                        overlay.open(({ isOpen, close }) => {
                          return (
                            <FormProvider {...method}>
                              <TimeBottomSheet
                                isOpen={isOpen}
                                onClose={close}
                              />
                            </FormProvider>
                          );
                        });
                      }}
                      className="bg-[#6D747E] text-white w-fit ml-auto px-2.5 py-1.5 h-7 hover:bg-slate-700 active:bg-slate-800"
                    >
                      <Plus size={16} className="mr-1" />
                      추가하기
                    </Button>
                  </div>
                ) : (
                  <>
                    {times?.map((item, index) => (
                      <div
                        key={item.id}
                        className="w-full pl-4 font-light flex items-center justify-between bg-[#f8f9fa] px-2 py-2 rounded-md"
                      >
                        <span>
                          {item.day}요일 {item.startTime} ~ {item.endTime}
                        </span>
                        <Button
                          variant="ghost"
                          className="h-7"
                          onClick={() => {
                            // //TODO: 기존에는 식별 id 값이 왔었는데 안옴. 확인 해봐야함.
                            // const index = fields.findIndex((field) => field.id === item.id
                            // );

                            remove(index);
                          }}
                        >
                          <span className="text-red-400">삭제</span>
                        </Button>
                      </div>
                    ))}
                    <Button
                      onClick={() => {
                        overlay.open(({ isOpen, close }) => {
                          return (
                            <FormProvider {...method}>
                              <TimeBottomSheet
                                isOpen={isOpen}
                                onClose={close}
                              />
                            </FormProvider>
                          );
                        });
                      }}
                      className="bg-[#6D747E] text-white w-fit mx-auto px-2.5 py-1.5 h-7 hover:bg-slate-600 active:bg-slate-700"
                    >
                      <Plus size={16} className="mr-1" />
                      추가하기
                    </Button>
                  </>
                )}
              </div>
            </Label>
            {errors?.times && (
              <ErrorMessage>{errors?.times.message}</ErrorMessage>
            )}
          </div>

          <div className="buttonArea text-center">
            <Button
              className="w-full h-12 rounded-lg mt-24 mb-12 font-semibold text-lg"
              onClick={handleSubmit}
            >
              저장
            </Button>
          </div>
        </div>
      </div>
    </FormProvider>
  );
};

export default EditForm;
