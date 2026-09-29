import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidePanelFooterComponent } from './side-panel-footer.component';

describe('SidePanelFooterComponent', () => {
  let component: SidePanelFooterComponent;
  let fixture: ComponentFixture<SidePanelFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePanelFooterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidePanelFooterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});