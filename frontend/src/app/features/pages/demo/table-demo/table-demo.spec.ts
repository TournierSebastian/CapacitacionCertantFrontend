import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TableDemo } from './table-demo';

describe('TableDemo', () => {
  let component: TableDemo;
  let fixture: ComponentFixture<TableDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TableDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(TableDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
