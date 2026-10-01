import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SidePanelDemoComponent } from './side-paneldemo';

describe('Sidepaneldemo', () => {
  let component: SidePanelDemoComponent;
  let fixture: ComponentFixture<SidePanelDemoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidePanelDemoComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SidePanelDemoComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
