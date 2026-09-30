import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockContainerComponent } from './block-container.component';

describe('BlockContainerComponent', () => {
  let fixture: ComponentFixture<BlockContainerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockContainerComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockContainerComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});