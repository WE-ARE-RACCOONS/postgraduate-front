import {
  observerProp,
  ToastService,
} from '@/components/common/Toast/ToastService';

export function useToast() {
  function addToast({ message, status }: observerProp) {
    ToastService.getInstance().addToast({ message, status });
  }

  return {
    addToast,
  };
}
