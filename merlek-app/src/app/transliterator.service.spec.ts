import { TestBed, inject } from '@angular/core/testing';

import { TransliteratorService } from './transliterator.service';
import { LetterService } from './letter.service';

describe('TransliteratorService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ TransliteratorService, LetterService ]
    });
  });

  it('should be created', inject([TransliteratorService], (service: TransliteratorService) => {
    expect(service).toBeTruthy();
  }));
});
