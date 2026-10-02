import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ToastDemo } from './toast-demo';

describe('ToastDemo', () => {
  let component: ToastDemo;
  let fixture: ComponentFixture<ToastDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToastDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(ToastDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
