import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidepanelComponent } from './side-panel.component';

describe('SidepanelComponent', () => {
  let component: SidepanelComponent;
  let fixture: ComponentFixture<SidepanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidepanelComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidepanelComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
