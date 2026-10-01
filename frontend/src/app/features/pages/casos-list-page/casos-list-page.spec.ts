import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CasosListPage } from './casos-list-page';

describe('CasosListPage', () => {
  let component: CasosListPage;
  let fixture: ComponentFixture<CasosListPage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasosListPage],
    }).compileComponents();

    fixture = TestBed.createComponent(CasosListPage);
    component = fixture.componentInstance;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});