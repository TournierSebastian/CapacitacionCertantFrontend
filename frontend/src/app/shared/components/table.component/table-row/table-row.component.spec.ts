import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableRowComponent } from './table-row.component';

describe('TableRowComponent', () => {
  let fixture: ComponentFixture<TableRowComponent>;
  let component: TableRowComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableRowComponent] }).compileComponents();
    fixture = TestBed.createComponent(TableRowComponent);
    component = fixture.componentInstance;
    fixture.componentRef.setInput('interactive', true);
    fixture.detectChanges();
  });

  it('renders an interactive table row', () => {
    expect(fixture.nativeElement.querySelector('tr')?.getAttribute('tabindex')).toBe('0');
  });
});