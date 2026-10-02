import { Injectable, signal } from '@angular/core';

export type ToastType = 'success' | 'error' | 'warning' | 'info';

export interface Toast {
  id: number;
  type: ToastType;
  message: string;
}

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  private readonly nextId = signal(0);

  readonly toasts = signal<Toast[]>([]);

  openToast(
    type: ToastType,
    message: string,
    duration = 4000,
  ): void {
    const id = this.nextId() + 1;
    this.nextId.set(id);

    const toast: Toast = {
      id,
      type,
      message,
    };

    this.toasts.update((toasts) => [
      ...toasts,
      toast,
    ]);

    if (duration > 0) {
      setTimeout(() => {
        this.closeToast(id);
      }, duration);
    }
  }

  success(message: string, duration = 4000): void {
    this.openToast('success', message, duration);
  }

  error(message: string, duration = 4000): void {
    this.openToast('error', message, duration);
  }

  warning(message: string, duration = 4000): void {
    this.openToast('warning', message, duration);
  }

  info(message: string, duration = 4000): void {
    this.openToast('info', message, duration);
  }

  closeToast(id: number): void {
    this.toasts.update((toasts) =>
      toasts.filter((toast) => toast.id !== id),
    );
  }

  clear(): void {
    this.toasts.set([]);
  }
}
