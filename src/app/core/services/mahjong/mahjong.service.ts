import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MahjongService {
  public sizeOfCardMahjong = 30;
  public divideTo = 2;
  public minValueCard = 1;
  public maxValueCard = 50;

  constructor() {
  }

  public createCollectionsOfCardNumber(): number[] {
    // it is a simple solution to a simple task.
    //   For a more complex task, you need to choose an advanced solution with caches and other improvements)))
    const map = new Map();
    nextPrime:
      for (let numberValue = 2; numberValue <= this.maxValueCard; numberValue++) {
        for (let j = 2; j < numberValue; j++) {
          if (numberValue % j === 0) {
            continue nextPrime;
          }
        }
        map.set(numberValue, numberValue);
      }
    return [...map.keys(), ...map.values()];
  }

  public getLiatCards(): number[] {
    return this.shakeArray(this.createCollectionsOfCardNumber());
  }

  public getRandomInteger(min, max): number {
    const rand = min - 0.5 + Math.random() * (max - min + 1);
    return Math.round(rand);
  }

  public shakeArray(array: number[]): number[] {
    return [...array].sort(() => Math.random() - 0.5);
  }

  public addToOpenedCards(buffer: [ICard, ICard], openedMapCards: IOpenedMapCards): void {
    buffer.forEach(item => {
      openedMapCards[item.index] = item;
    });
  }

  public checkedSelectedCardsDesameOrNot(buffer: [ICard, ICard]): boolean {
    return buffer[0].value === buffer[1].value
      && buffer[0].index !== buffer[1].index;
  }

}
