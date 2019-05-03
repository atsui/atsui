import { TestBed } from '@angular/core/testing';

import { AtsuiExamplesService } from './atsui-examples.service';

describe('AtsuiExamplesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtsuiExamplesService = TestBed.get(AtsuiExamplesService);
    expect(service).toBeTruthy();
  });
});
