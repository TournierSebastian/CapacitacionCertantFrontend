import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Buttoncomponent } from './button.component';

describe('Buttoncomponent', () => {
  let component: Buttoncomponent;
  let fixture: ComponentFixture<Buttoncomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Buttoncomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Buttoncomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
