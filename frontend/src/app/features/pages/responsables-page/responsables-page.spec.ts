import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ResponsablesPage } from './responsables-page';

describe('ResponsablesPage', () => {
  let component: ResponsablesPage;
  let fixture: ComponentFixture<ResponsablesPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ResponsablesPage],
    }).compileComponents();

    fixture = TestBed.createComponent(ResponsablesPage);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
