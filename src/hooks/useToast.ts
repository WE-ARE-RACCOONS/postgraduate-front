import { observerProp, ToastService } from '@/components/Toast/ToastService';

export function useToast() {
  function addToast({ message, status }: observerProp) {
    ToastService.getInstance().addToast({ message, status });
  }

  return {
    addToast,
  };
}
