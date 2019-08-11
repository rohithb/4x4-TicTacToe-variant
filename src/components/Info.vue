<template>
  <div class="stats" :class="cls">
    <h1>Info</h1>
    <div class="row" v-if="isGameOver">
      <div class="col won-banner">Player {{winner +1}} Won</div>
    </div>
    <div class="row" v-else>
      <div class="col">Player {{currentPlayer}}'s Turn</div>
    </div>
    <div class="row">
      <div class="col">
        <button class="reset-button" @click="resetGame()">Reset Game</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Prop, Component } from 'vue-property-decorator'
import store from "../store/store";
import { Types } from '../store/types';

@Component
export default class Info extends Vue {
  @Prop() private cls!: string;

  get currentPlayer(): number {
    return store.state.currentPlayer + 1;
  }
  get isGameOver(): boolean {
    return store.state.winner !== null;
  }
  get winner(): number | null {
    return store.state.winner;
  }
  private resetGame(): void {
    store.dispatch(Types.actions.INIT_BOARD);
  }
}
</script>

<style lang="less" scoped>
.stats {
  background-color: #042a3c;
  color: #fff;
}
.won-banner {
  background-color: blue;
}
</style>