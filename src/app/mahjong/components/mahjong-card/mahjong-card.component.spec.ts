import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MahjongCardComponent } from './mahjong-card.component';

describe('MahjongCardComponent', () => {
  let component: MahjongCardComponent;
  let fixture: ComponentFixture<MahjongCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MahjongCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MahjongCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
