import { Component } from '@angular/core';
import { ParagraphComponent } from '../../../../shared/components/paragraph/paragraph.component';

@Component({
  selector: 'app-paragraph-demo',
  standalone: true,
  imports: [ParagraphComponent],
  templateUrl: './paragraph-demo.html',
  styleUrl: './paragraph-demo.scss',
})
export class ParagraphDemo {}