import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ToastService, ToastType } from './toast.service';


@Component({
  selector: 'app-toast',
  standalone: true,
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastComponent {
  protected readonly toastService = inject(ToastService);

  protected readonly icons: Record<ToastType, string> = {
    success: '✓',
    error: '!',
    warning: '⚠',
    info: 'i',
  };

  closeToast(id: number): void {
    this.toastService.closeToast(id);
  }
}

