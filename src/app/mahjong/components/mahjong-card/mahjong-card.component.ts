import {Component, EventEmitter, Input, OnDestroy, Output} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {of, Subject} from 'rxjs';
import {delay, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'app-mahjong-card',
  templateUrl: './mahjong-card.component.html',
  styleUrls: ['./mahjong-card.component.scss'],
  animations: [
    trigger('openClose', [
      state('open', style({
        opacity: 1,
      })),
      state('closed', style({
        opacity: 0.5,
      })),
      transition('open => closed', [
        animate('1.5s')
      ]),
      transition('closed => open', [
        animate('0.3s')
      ]),
    ]),
  ]
})
export class MahjongCardComponent implements OnDestroy {
  @Input() public value: number;
  @Input() public index: number;
  @Input() public firstCard: ICard;
  @Input() public openedMapCards: IOpenedMapCards;
  @Output() public clickOnCard: EventEmitter<ICard> = new EventEmitter<ICard>();
  public tempSelected = false;
  private destroy$: Subject<void> = new Subject<void>();
  constructor() { }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clickedOnCard(): void {
    if (!this.checkIsClickOnOpenCard()) {
      this.toggleTempSelected();
      this.clickOnCard.emit({
        value: this.value,
        index: this.index
      });
    }
  }

  private toggleTempSelected(): void {
    this.setTempSelected();
    of(true)
      .pipe(
        takeUntil(this.destroy$),
        delay(300)
      )
      .subscribe(() => this.setTempSelected());
  }

  private setTempSelected(): void {
    this.tempSelected = !this.tempSelected;
  }

  private checkIsClickOnOpenCard(): boolean {
    return this.openedMapCards && !!this.openedMapCards[this.index];
  }

}
