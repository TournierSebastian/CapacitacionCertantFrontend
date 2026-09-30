import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockLayoutDemo } from './block-layout-demo';

describe('BlockLayoutDemo', () => {
  let component: BlockLayoutDemo;
  let fixture: ComponentFixture<BlockLayoutDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockLayoutDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockLayoutDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
