import Vue from 'vue';
import Vuex, { StoreOptions, ActionContext } from 'vuex';
import { RootState, Types } from './types';
import Player from '@/constants/Players';

Vue.use(Vuex);

function getInitialState() {
  return {
    board: [],
    size: 4,
    currentPlayer: Player.Player1,
    score: {
      [Player.Player1]: 0,
      [Player.Player2]: 0
    },
    matchedIndices: [],
    winner: null,
    markedSquareCount: 0
  };
}

const store: StoreOptions<RootState> = {
  state: getInitialState(),
  mutations: {
    [Types.mutations.INIT_BOARD]: state => {
      const s = getInitialState();
      const length = state.size * state.size;
      state.board = new Array(length).fill(-1);
      state.size = s.size;
      state.currentPlayer = s.currentPlayer;
      state.score[Player.Player1] = 0;
      state.score[Player.Player2] = 0;
      state.matchedIndices = [];
      state.winner = null;
      state.markedSquareCount = 0;
    },
    [Types.mutations.SET_PLAYER]: (state, player: Player) => {
      state.currentPlayer = player;
    },
    [Types.mutations.MARK_AS_PLAYED]: (state: RootState, { index, player }) => {
      Vue.set(state.board, index, player);
    },
    [Types.mutations.PUSH_MATCHED_PATTERN]: (
      state: RootState,
      pattern: [number, number, number]
    ) => {
      for (const i of pattern) {
        state.matchedIndices.push(i);
      }
    },
    [Types.mutations.INCREMENT_SCORE]: (state: RootState, player: Player) => {
      state.score[player]++;
    },
    [Types.mutations.SET_WINNER]: (state: RootState, player: Player) => {
      state.winner = player;
    },
    [Types.mutations.INCREMENT_MARKED_SQ_COUNT]: state => {
      state.markedSquareCount++;
    }
  },
  actions: {
    /**
     * Initialize the board /reset the board
     */
    [Types.actions.INIT_BOARD]: ({ commit }) => {
      commit(Types.mutations.INIT_BOARD);
    },
    /**
     * Change the current player with the other player
     */
    [Types.actions.TOGGLE_CURRENT_PLAYER]: async ({ commit, state }) => {
      if (state.currentPlayer === Player.Player1) {
        commit(Types.mutations.SET_PLAYER, Player.Player2);
      } else {
        commit(Types.mutations.SET_PLAYER, Player.Player1);
      }
    },
    /**
     * Mark a square with either 0 or 1 and changes the current player
     */
    [Types.actions.MARK_AS_PLAYED]: async (context, index: number) => {
      context.commit(Types.mutations.MARK_AS_PLAYED, {
        index,
        player: context.state.currentPlayer
      });
      context.dispatch(Types.actions.INCREMENT_MARKED_SQ_COUNT);
      // WARNING: Async execution
      await context.dispatch(Types.actions.TOGGLE_CURRENT_PLAYER);
    },

    [Types.actions.ADD_MATCHED_PATTERN]: (context, { pattern, player }) => {
      context.commit(Types.mutations.PUSH_MATCHED_PATTERN, pattern);
      context.commit(Types.mutations.INCREMENT_SCORE, player);
    },
    [Types.actions.SET_WINNER]: (context, player: Player) => {
      context.commit(Types.mutations.SET_WINNER, player);
    },
    [Types.actions.INCREMENT_MARKED_SQ_COUNT]: context => {
      context.commit(Types.mutations.INCREMENT_MARKED_SQ_COUNT);
    }
  }
};

export default new Vuex.Store<RootState>(store);
