import Player from './constants/Players';

export interface RootState {
  board: number[];
  size: number;
  currentPlayer: Player;
}
