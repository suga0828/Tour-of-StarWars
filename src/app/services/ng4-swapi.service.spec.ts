import { TestBed, inject } from '@angular/core/testing';

import { Ng4SwapiService } from './ng4-swapi.service';

describe('Ng4SwapiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [Ng4SwapiService]
    });
  });

  it('should be created', inject([Ng4SwapiService], (service: Ng4SwapiService) => {
    expect(service).toBeTruthy();
  }));
});
