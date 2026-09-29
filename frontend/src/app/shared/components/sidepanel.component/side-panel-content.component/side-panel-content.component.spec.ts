import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidePanelContentComponent } from './side-panel-content.component';

describe('SidePanelContentComponent', () => {
  let component: SidePanelContentComponent;
  let fixture: ComponentFixture<SidePanelContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePanelContentComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidePanelContentComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});