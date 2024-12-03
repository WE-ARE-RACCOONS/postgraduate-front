import { observerProp } from './ToastService';
import './index.css';
export function ToastMessage({ message, status }: observerProp) {
  const getStatusClass = () => {
    switch (status) {
      case 'success':
        return 'toast-success';
      case 'error':
        return 'toast-error';
      default:
        return '';
    }
  };

  return <div className={`toast-message ${getStatusClass()}`}>{message}</div>;
}
