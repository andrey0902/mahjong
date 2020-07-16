import { TestBed } from '@angular/core/testing';

import { MahjongService } from './mahjong.service';

describe('MahjongService', () => {
  let service: MahjongService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MahjongService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
