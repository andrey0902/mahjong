import {Component, OnDestroy, OnInit} from '@angular/core';
import {MahjongService} from '../../../core/services/mahjong/mahjong.service';
import {Observable, of, Subject} from 'rxjs';
import {bufferCount, debounceTime, switchMap, takeUntil, tap} from 'rxjs/operators';

@Component({
  selector: 'app-mahjong',
  templateUrl: './mahjong.component.html',
  styleUrls: ['./mahjong.component.scss']
})
export class MahjongComponent implements OnInit, OnDestroy {
  public cards: number[];
  public openedMapCards: IOpenedMapCards = {};
  public firstCard: ICard;
  private bufferCountCards = 2;
  private eventClickOnCard: Subject<ICard> = new Subject<ICard>();
  private destroy$: Subject<void> = new Subject<void>();
  constructor(private mahjongService: MahjongService) {
  }

  public ngOnInit(): void {
    this.runGame();
    this.subscribeToEvents();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public clickOnCard({value, index}): void {
    this.eventClickOnCard.next({
      value,
      index
    });
  }

  private runGame(): void {
    this.cards = this.mahjongService.getLiatCards();
  }

  private subscribeToEvents(): void {
    this.eventClickOnCard
      .pipe(
        takeUntil(this.destroy$),
        tap(card => this.firstCard = card),
        bufferCount(this.bufferCountCards),
        tap((buffer: [ICard, ICard]) => {
          if (this.mahjongService.checkedSelectedCardsDesameOrNot(buffer)) {
            this.mahjongService.addToOpenedCards(buffer, this.openedMapCards);
          }
        }),
        switchMap(() => this.getObservableWithDebounceTime())
      )
      .subscribe(() => {
        this.clearFirstSelectedCard();
      });
  }

  private clearFirstSelectedCard(): void {
    this.firstCard = null;
  }

  private getObservableWithDebounceTime(): Observable<boolean> {
    return of(true)
      .pipe(
        debounceTime(200)
      );
  }

}
