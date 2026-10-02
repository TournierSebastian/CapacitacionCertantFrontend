import {
  ChangeDetectionStrategy,
  Component,
  inject,
} from '@angular/core';
import { ToastService } from '../../../../shared/components/toast.component/toast.service';
import { ButtonComponent } from '../../../../shared/components/button/button.component';
import { ToastComponent } from '../../../../shared/components/toast.component/toast.component';

@Component({
  selector: 'app-toast-demo',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './toast-demo.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ToastDemoComponent {
  private readonly toastService = inject(ToastService);

  mostrarSuccess(): void {
    this.toastService.success(
      'El caso se creó correctamente.',
    );
  }

  mostrarError(): void {
    this.toastService.error(
      'No se pudo guardar el caso.',
    );
  }

  mostrarWarning(): void {
    this.toastService.warning(
      'Revisá los datos antes de continuar.',
    );
  }

  mostrarInfo(): void {
    this.toastService.info(
      'El caso está siendo procesado.',
    );
  }

  mostrarVarios(): void {
    this.toastService.success('Primera notificación.');
    this.toastService.info('Segunda notificación.');
    this.toastService.warning('Tercera notificación.');
  }

  mostrarPersonalizado(): void {
    this.toastService.openToast(
      'success',
      'Este toast usa openToast() directamente.',
      8000,
    );
  }

  limpiar(): void {
    this.toastService.clear();
  }
}

