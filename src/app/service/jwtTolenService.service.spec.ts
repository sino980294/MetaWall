/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { JwtTokenServiceService } from './jwtTolenService.service';

describe('Service: JwtTolenService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [JwtTokenServiceService]
    });
  });

  it('should ...', inject([JwtTokenServiceService], (service: JwtTokenServiceService) => {
    expect(service).toBeTruthy();
  }));
});
