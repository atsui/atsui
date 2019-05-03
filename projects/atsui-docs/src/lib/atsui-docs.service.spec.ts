import { TestBed } from '@angular/core/testing';

import { AtsuiDocsService } from './atsui-docs.service';

describe('AtsuiDocsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AtsuiDocsService = TestBed.get(AtsuiDocsService);
    expect(service).toBeTruthy();
  });
});
