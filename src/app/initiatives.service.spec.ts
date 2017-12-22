import { TestBed, inject } from '@angular/core/testing';

import { InitiativesService } from './initiatives.service';

describe('InitiativesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [InitiativesService]
    });
  });

  it('should be created', inject([InitiativesService], (service: InitiativesService) => {
    expect(service).toBeTruthy();
  }));
});
