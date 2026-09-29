import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Badgecomponent } from './badge.component';

describe('Badgecomponent', () => {
  let component: Badgecomponent;
  let fixture: ComponentFixture<Badgecomponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Badgecomponent],
    }).compileComponents();

    fixture = TestBed.createComponent(Badgecomponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
