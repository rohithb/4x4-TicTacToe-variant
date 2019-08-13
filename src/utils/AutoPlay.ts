import { StoreOptions } from 'vuex';
import { RootState } from '@/store/types';

export default class AutoPlay {
  public static autoPlay(currentPlayer: number, state: RootState): void {
    setTimeout(() => {
      const arrSize = state.size * state.size;
      if (state.winner === null && state.markedSquareCount < arrSize) {
        let nextMove: number = -1;
        while (nextMove < 0 || state.board[nextMove] !== -1) {
          nextMove = this.getRand(arrSize);
        }
        const ele = document.getElementById('sq-' + nextMove);
        if (ele) {
          ele.click();
        }
      }
    }, 500);
  }

  private static getRand(limit: number): number {
    return Math.floor(Math.random() * limit);
  }
}
