import Player from '@/constants/Players';

export interface RootState {
  board: number[];
  size: number;
  currentPlayer: Player;
  score: { [key: number]: number };
  matchedIndices: number[];
  winner: number | null;
  markedSquareCount: number;
}

export const Types = {
  mutations: {
    INIT_BOARD: 'INIT_BOARD',
    SET_PLAYER: 'SET_PLAYER',
    MARK_AS_PLAYED: 'MARK_AS_PLAYED',
    PUSH_MATCHED_PATTERN: 'PUSH_MATCHED_PATTERN',
    INCREMENT_SCORE: 'INCREMENT_SCORE',
    SET_WINNER: 'SET_WINNER',
    INCREMENT_MARKED_SQ_COUNT: 'INCREMENT_MARKED_SQ_COUNT'
  },
  actions: {
    INIT_BOARD: 'INIT_BOARD',
    TOGGLE_CURRENT_PLAYER: 'TOGGLE_CURRENT_PLAYER',
    MARK_AS_PLAYED: 'MARK_AS_PLAYED',
    ADD_MATCHED_PATTERN: 'ADD_MATCHED_PATTERN',
    SET_WINNER: 'SET_WINNER',
    INCREMENT_MARKED_SQ_COUNT: 'INCREMENT_MARKED_SQ_COUNT'
  }
};
