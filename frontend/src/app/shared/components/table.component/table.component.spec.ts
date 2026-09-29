import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableBodyComponent } from './table-body/table-body.component';
import { TableCellComponent } from './table-cell/table-cell.component';
import { TableHeadComponent } from './table-head/table-head.component';
import { TableHeaderCellComponent } from './table-header-cell/table-header-cell.component';
import { TableRowComponent } from './table-row/table-row.component';
import { TableComponent } from './table.component';

@Component({
  standalone: true,
  imports: [
    TableBodyComponent,
    TableCellComponent,
    TableComponent,
    TableHeadComponent,
    TableHeaderCellComponent,
    TableRowComponent,
  ],
  template: `
    <app-table>
      <app-table-head>
        <app-table-row>
          <app-table-header-cell>Nombre</app-table-header-cell>
        </app-table-row>
      </app-table-head>
      <app-table-body>
        <app-table-row>
          <app-table-cell>Ejemplo</app-table-cell>
        </app-table-row>
      </app-table-body>
    </app-table>
  `,
})
class TableHostComponent {}

describe('TableComponent', () => {
  let fixture: ComponentFixture<TableHostComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableHostComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TableHostComponent);
    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('projects the supplied table structure', () => {
    expect(fixture.nativeElement.querySelector('th')?.textContent).toContain('Nombre');
    expect(fixture.nativeElement.querySelector('td')?.textContent).toContain('Ejemplo');
  });
});
