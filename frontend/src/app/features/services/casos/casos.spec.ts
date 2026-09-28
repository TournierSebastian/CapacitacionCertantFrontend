import { TestBed } from '@angular/core/testing';
import { Casos } from './casos';

describe('Casos', () => {
  let service: Casos;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Casos);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
