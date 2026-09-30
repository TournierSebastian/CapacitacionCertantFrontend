import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FlexLayoutComponent } from './flex-layout.component';

describe('FlexLayoutComponent', () => {
  let fixture: ComponentFixture<FlexLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlexLayoutComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FlexLayoutComponent);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(fixture.componentInstance).toBeTruthy();
  });
});