import { TestBed } from '@angular/core/testing';
import { Responsables } from './responsables';

describe('Responsables', () => {
  let service: Responsables;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Responsables);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
