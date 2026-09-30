import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutDemo } from './flex-layout-demo';

describe('FlexLayoutDemo', () => {
  let component: FlexLayoutDemo;
  let fixture: ComponentFixture<FlexLayoutDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexLayoutDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(FlexLayoutDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
