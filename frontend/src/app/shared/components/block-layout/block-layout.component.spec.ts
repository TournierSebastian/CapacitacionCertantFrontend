import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockLayoutComponent } from './block-layout.component';

describe('BlockLayoutComponent', () => {
  let fixture: ComponentFixture<BlockLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockLayoutComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});