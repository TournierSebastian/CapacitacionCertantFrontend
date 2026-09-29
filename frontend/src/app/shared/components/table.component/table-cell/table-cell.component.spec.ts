import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableCellComponent } from './table-cell.component';

describe('TableCellComponent', () => {
  let fixture: ComponentFixture<TableCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableCellComponent] }).compileComponents();
    fixture = TestBed.createComponent(TableCellComponent);
    fixture.detectChanges();
  });

  it('renders a table cell', () => {
    expect(fixture.nativeElement.querySelector('td')).toBeTruthy();
  });
});