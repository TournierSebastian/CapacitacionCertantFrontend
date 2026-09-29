import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Paginatordemo } from './paginatordemo';

describe('Paginatordemo', () => {
  let component: Paginatordemo;
  let fixture: ComponentFixture<Paginatordemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paginatordemo],
    }).compileComponents();

    fixture = TestBed.createComponent(Paginatordemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
