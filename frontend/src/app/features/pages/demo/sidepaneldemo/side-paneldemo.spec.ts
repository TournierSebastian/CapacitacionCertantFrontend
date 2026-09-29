import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Sidepaneldemo } from './side-paneldemo';

describe('Sidepaneldemo', () => {
  let component: Sidepaneldemo;
  let fixture: ComponentFixture<Sidepaneldemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sidepaneldemo],
    }).compileComponents();

    fixture = TestBed.createComponent(Sidepaneldemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
