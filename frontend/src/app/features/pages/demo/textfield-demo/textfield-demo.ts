import {
  ChangeDetectionStrategy,
  Component,
  signal,
} from '@angular/core';
import { TextfieldComponent } from '../../../../shared/components/textfield/textfield.component';


@Component({
  selector: 'app-textfield-demo',
  standalone: true,
  imports: [TextfieldComponent],
  templateUrl: './textfield-demo.html',
  styleUrl: './textfield-demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextfieldDemo{
  readonly nombre = signal('');
  readonly busqueda = signal('');
  readonly email = signal('');

  limpiar(): void {
    this.nombre.set('');
    this.busqueda.set('');
    this.email.set('');
  }
}