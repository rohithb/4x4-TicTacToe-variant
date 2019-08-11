import Player from '@/constants/Players';

export interface RootState {
  board: number[];
  size: number;
  currentPlayer: Player;
  score: { [key: number]: number };
  matchedIndices: number[];
}

export const Types = {
  mutations: {
    INIT_BOARD: 'INIT_BOARD',
    SET_PLAYER: 'SET_PLAYER',
    MARK_AS_PLAYED: 'MARK_AS_PLAYED',
    PUSH_MATCHED_PATTERN: 'PUSH_MATCHED_PATTERN',
    INCREMENT_SCORE: 'INCREMENT_SCORE'
  },
  actions: {
    INIT_BOARD: 'INIT_BOARD',
    TOGGLE_CURRENT_PLAYER: 'TOGGLE_CURRENT_PLAYER',
    MARK_AS_PLAYED: 'MARK_AS_PLAYED',
    ADD_MATCHED_PATTERN: 'ADD_MATCHED_PATTERN'
  }
};
