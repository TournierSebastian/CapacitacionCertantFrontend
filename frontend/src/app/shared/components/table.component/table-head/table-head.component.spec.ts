import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableHeadComponent } from './table-head.component';

describe('TableHeadComponent', () => {
  let fixture: ComponentFixture<TableHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({ imports: [TableHeadComponent] }).compileComponents();
    fixture = TestBed.createComponent(TableHeadComponent);
    fixture.detectChanges();
  });

  it('renders a table head', () => {
    expect(fixture.nativeElement.querySelector('thead')).toBeTruthy();
  });
});