import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Selectdemo } from './selectdemo';

describe('Selectdemo', () => {
  let component: Selectdemo;
  let fixture: ComponentFixture<Selectdemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Selectdemo],
    }).compileComponents();

    fixture = TestBed.createComponent(Selectdemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
