import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badgedemo } from './badgedemo';

describe('Badgedemo', () => {
  let component: Badgedemo;
  let fixture: ComponentFixture<Badgedemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badgedemo],
    }).compileComponents();

    fixture = TestBed.createComponent(Badgedemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
