import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeaderCellComponent } from './table-header-cell.component';

describe('TableHeaderCellComponent', () => {
  let fixture: ComponentFixture<TableHeaderCellComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableHeaderCellComponent] }).compileComponents();
    fixture = TestBed.createComponent(TableHeaderCellComponent);
    fixture.detectChanges();
  });

  it('renders a scoped header cell', () => {
    expect(fixture.nativeElement.querySelector('th')?.getAttribute('scope')).toBe('col');
  });
});