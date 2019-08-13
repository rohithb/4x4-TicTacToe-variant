<template>
  <div class="container">
    <div class="row">
      <div class="col-5">
        <table class="board">
          <tr v-for="i in size" :key="i">
            <Square v-for="j in size" :key="(i-1)*size+j" :index="(i-1)*size+j-1"></Square>
          </tr>
        </table>
      </div>
      <Info cls="col-3" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import Square from './Square.vue';
import Info from './Info.vue';
import store from '../store/store';
import { Types } from '../store/types';
import AutoPlay from '../utils/AutoPlay';
import 'bootstrap-4-grid/css/grid.css';
import Player from '../constants/Players';

@Component({
  components: {
    Square,
    Info
  }
})
export default class Board extends Vue {
  @Prop() private size!: number;

  public created(): void {
    store.dispatch(Types.actions.INIT_BOARD);
  }

  get currentPlayer(): number {
    return store.state.currentPlayer;
  }
  @Watch('currentPlayer')
  private onCurrentPlayerChange(currentPlayer: number): void {
    AutoPlay.autoPlay(currentPlayer, store.state);
  }

}
</script>

<style scoped lang="less">
td {
  border: 2px solid #333;
  height: 100px;
  width: 100px;
  text-align: center;
  vertical-align: middle;
  font-family: "Comic Sans MS", cursive, sans-serif;
  font-size: 70px;
  cursor: pointer;
}

table {
  border-collapse: collapse;
  margin: auto;
}

table tr:first-child td {
  border-top: 0;
}

table tr:last-child td {
  border-bottom: 0;
}

table tr td:first-child {
  border-left: 0;
}

table tr td:last-child {
  border-right: 0;
}
</style>
