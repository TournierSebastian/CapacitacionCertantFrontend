import { ComponentFixture, TestBed } from '@angular/core/testing';
import { BlockContainerDemo } from './block-container-demo';

describe('BlockContainerDemo', () => {
  let component: BlockContainerDemo;
  let fixture: ComponentFixture<BlockContainerDemo>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BlockContainerDemo],
    }).compileComponents();

    fixture = TestBed.createComponent(BlockContainerDemo);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
