export interface observerProp {
  message: string;
  status: 'error' | 'success';
}

export class ToastService {
  private static instance: ToastService | null = null;

  private observers: any[] = [];
  private messages: observerProp[] = [];

  private constructor() {}

  public static getInstance(): ToastService {
    if (!ToastService.instance) {
      ToastService.instance = new ToastService();
    }
    return ToastService.instance;
  }

  subscribe(observer: (props: observerProp) => void) {
    this.observers.push(observer);
  }

  unsubscribe(observer: (props: observerProp) => void) {
    this.observers = this.observers.filter((obs) => obs !== observer);
  }

  notify() {
    this.observers.forEach((obs) =>
      obs(this.messages[this.messages.length - 1]),
    );
  }

  addToast(props: observerProp) {
    if (this.messages.length > 2) {
      this.messages.shift();
    }
    this.messages.push(props);
    this.notify();
  }
}
