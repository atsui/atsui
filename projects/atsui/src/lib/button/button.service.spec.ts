import { TestBed } from '@angular/core/testing';

import { AtsuiButtonService } from './button.service';

describe('AtsuiButtonService', () => {
  let service: AtsuiButtonService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AtsuiButtonService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
