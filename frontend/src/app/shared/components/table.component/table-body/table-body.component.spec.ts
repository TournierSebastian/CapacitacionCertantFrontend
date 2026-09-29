import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableBodyComponent } from './table-body.component';

describe('TableBodyComponent', () => {
  let fixture: ComponentFixture<TableBodyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableBodyComponent] }).compileComponents();
    fixture = TestBed.createComponent(TableBodyComponent);
    fixture.detectChanges();
  });

  it('renders a table body', () => {
    expect(fixture.nativeElement.querySelector('tbody')).toBeTruthy();
  });
});