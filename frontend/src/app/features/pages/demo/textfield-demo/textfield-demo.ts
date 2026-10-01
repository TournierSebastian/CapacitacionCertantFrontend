import {
  ChangeDetectionStrategy,
  Component,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextfieldComponent } from '../../../../shared/components/textfield/textfield.component';

@Component({
  selector: 'app-textfield-demo',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    TextfieldComponent,
  ],
  templateUrl: './textfield-demo.html',
  styleUrl: './textfield-demo.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextfieldDemo {
  readonly formulario = new FormGroup({
    nombre: new FormControl(''),
    busqueda: new FormControl(''),
    email: new FormControl(''),
  });

  limpiar(): void {
    this.formulario.reset();
  }
}