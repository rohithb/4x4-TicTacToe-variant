import Vue from 'vue';
import Vuex, { StoreOptions, ActionContext } from 'vuex';
import { RootState } from './types';
import Player from './constants/Players';

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    board: [],
    size: 4,
    currentPlayer: Player.Player1
  },
  mutations: {
    initBoard: state => {
      // state.board[i][j] = player;
      const length = state.size * state.size;
      state.board = new Array(length).fill(-1);
    },
    setPlayer: (state, player: Player) => {
      state.currentPlayer = player;
    },
    markAsPlayed: (state: RootState, { index, player }) => {
      Vue.set(state.board, index, player);
    }
  },
  actions: {
    initBoard: ({ commit }) => {
      commit('initBoard');
    },
    toggleCurrentPlayer: ({ commit, state }) => {
      if (state.currentPlayer === Player.Player1) {
        commit('setPlayer', Player.Player2);
      } else {
        commit('setPlayer', Player.Player1);
      }
    },
    markAsPlayed: (context, index) => {
      context.commit('markAsPlayed', {
        index,
        player: context.state.currentPlayer
      });
      // WARNING: Async execution
      context.dispatch('toggleCurrentPlayer');
    }
  }
};

export default new Vuex.Store<RootState>(store);
