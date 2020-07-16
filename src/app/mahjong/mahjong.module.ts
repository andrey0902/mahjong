import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MahjongComponent} from './containers/mahjong/mahjong.component';
import {MahjongCardComponent} from './components/mahjong-card/mahjong-card.component';

@NgModule({
  declarations: [MahjongComponent, MahjongCardComponent],
  exports: [
    MahjongComponent
  ],
  imports: [
    CommonModule
  ]
})
export class MahjongModule {
}
