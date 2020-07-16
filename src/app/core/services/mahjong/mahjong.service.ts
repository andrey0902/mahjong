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

  public getLiatCards(): number[] {
    return this.shakeArray(this.createCollectionsOfCardNumber());
  }

  public createCollectionsOfCardNumber(): number[] {
    const map = new Map();
    while (map.size < Math.round(this.sizeOfCardMahjong / this.divideTo)) {
      const numberValue: number = this.getRandomInteger(this.minValueCard, this.maxValueCard);
      map.set(numberValue, numberValue);
    }
    return [...map.keys(), ...map.values()];
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
