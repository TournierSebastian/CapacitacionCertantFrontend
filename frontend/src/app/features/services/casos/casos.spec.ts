import { provideHttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CasosService } from './casos';

describe('CasosService', () => {
  let service: CasosService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [provideHttpClient()] });
    service = TestBed.inject(CasosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});