<template>
  <td
    :id="'sq-'+index"
    class="square"
    @click="mark()"
    :class="{invalid: isInvalid, matched:isInMatchedIndices, player2:currentPlayer, player1: !currentPlayer}"
  >{{getSquareContent}}</td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '@/store/store';
import { Types } from '@/store/types';
import GameUtils from '@/utils/GameUtils';

@Component
export default class Square extends Vue {
  @Prop() private index!: number;
  private isInvalid: boolean = false;
  /**
   * Mark this square with the current player
   */
  private mark() {
    if (!this.isMarked() && store.state.winner === null) {
      const currentPlayer = store.state.currentPlayer;
      store.dispatch(Types.actions.MARK_AS_PLAYED, this.index)
        .then(() => {
          const matchedIndices = GameUtils.checkMatchingPatterns(
            store.state.board,
            this.index,
            currentPlayer,
            store.state.size
          );
          if (matchedIndices) {
            const currentScore = store.state.score[currentPlayer];
            store.dispatch(Types.actions.ADD_MATCHED_PATTERN, { pattern: matchedIndices, player: currentPlayer });
            if (currentScore > 0) { // currentScore is not reactive. A workaround to handle async nature
              store.dispatch(Types.actions.SET_WINNER, currentPlayer);
            }
          }
        });
    } else {
      this.isInvalid = true;
      setTimeout(() => {
        this.isInvalid = false;
      }, 1000);
    }
  }
  /**
   * Check weather the square is marked or not
   */
  private isMarked() {
    return store.state.board[this.index] === -1 ? false : true;
  }

  get isInMatchedIndices() {
    return store.state.matchedIndices.includes(this.index);
  }

  get currentPlayer() {
    return store.state.currentPlayer;
  }


  /**
   * function to render X and O instead of 0 and 1 used in the array
   */
  get getSquareContent(): string {
    const value = store.state.board[this.index];
    if (value === 0) {
      return 'O';
    } else if (value === 1) {
      return 'X';
    }
    return '';
  }
}
</script>

<style lang="less" scoped>
.square {
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
}
.invalid {
  transition: all 0.5s ease-in-out;
  background-color: #ec903b9a !important;
}
.matched {
  transition: all 0.5s ease-in-out;
  background-color: #8bec3b9a !important;
}
.player1 {
  cursor: url("../assets/o.png"), auto;
}
.player2 {
  cursor: url("../assets/x.png"), auto;
}
</style>