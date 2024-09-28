import { SeniorInfoResponse } from '@/api/senior/me/seniorInfoGetFetch';
import { create } from 'zustand';

export interface TimeState
  extends Omit<
    ArrayType<PropType<PropType<SeniorInfoResponse, 'data'>, 'times'>>,
    'startTime' | 'endTime'
  > {
  startTime: {
    hour: string;
    minutes: string;
  };

  endTime: {
    hour: string;
    minutes: string;
  };
}

export interface TimeAction {
  setTime: (newTime: Partial<TimeState>) => void;
}

export const useTimeStore = create<TimeState & TimeAction>((set) => ({
  id: '',
  day: '',
  startTime: {
    hour: '09',
    minutes: '00',
  },
  endTime: {
    hour: '09',
    minutes: '00',
  },

  setTime: (newTime) =>
    set(() => ({
      ...newTime,
    })),
}));
