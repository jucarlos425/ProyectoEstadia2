import { TestBed } from '@angular/core/testing';

import { NoAuthorizatedGuard } from './no-authorizated.guard';

describe('NoAuthorizatedGuard', () => {
  let guard: NoAuthorizatedGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(NoAuthorizatedGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
