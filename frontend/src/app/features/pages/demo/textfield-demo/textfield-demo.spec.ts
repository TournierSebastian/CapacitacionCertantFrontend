import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TextfieldDemo } from './textfield-demo';

describe('TextfieldDemo', () => {
  let component: TextfieldDemo;
  let fixture: ComponentFixture<TextfieldDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TextfieldDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(TextfieldDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
