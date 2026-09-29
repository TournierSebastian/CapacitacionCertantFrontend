import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-table-head',
  standalone: true,
  templateUrl: './table-head.component.html',
  styleUrl: './table-head.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableHeadComponent {}