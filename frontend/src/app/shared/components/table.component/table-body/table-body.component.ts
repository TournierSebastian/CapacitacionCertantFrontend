import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-table-body',
  standalone: true,
  templateUrl: './table-body.component.html',
  styleUrl: './table-body.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableBodyComponent {}