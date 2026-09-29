import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidePanelHeaderComponent } from './side-panel-header.component';

describe('SidePanelHeaderComponent', () => {
  let component: SidePanelHeaderComponent;
  let fixture: ComponentFixture<SidePanelHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePanelHeaderComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidePanelHeaderComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
