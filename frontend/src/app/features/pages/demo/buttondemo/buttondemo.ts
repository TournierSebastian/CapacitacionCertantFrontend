import { Component } from '@angular/core';
import { ButtonComponent } from '../../../../shared/components/button/button.component';

@Component({
  selector: 'app-buttondemo',
  standalone: true,
  imports: [ButtonComponent],
  templateUrl: './buttondemo.html',
  styleUrl: './buttondemo.css',
})
export class Buttondemo {
  mensaje = '';

  
  btnClick(variant: string): void {
    this.mensaje = `Se hizo clic en el botón ${variant}`;
    console.log(`Se hizo clic en el botón ${variant}`);
  }

}