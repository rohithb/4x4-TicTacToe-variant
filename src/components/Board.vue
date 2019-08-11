<template>
  <ul>
    <table class="board">
      <tr v-for="i in size" :key="i">
        <Square v-for="j in size" :key="(i-1)*size+j" :index="(i-1)*size+j-1"></Square>
      </tr>
    </table>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Square from './Square.vue';
import store from '../store/store';
import { Types } from '../store/types';

@Component({
  components: {
    Square
  }
})
export default class Board extends Vue {
  @Prop() private size!: number;

  public created(): void {
    store.dispatch(Types.actions.INIT_BOARD);
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
  position: absolute;
  left: 50%;
  margin-left: -155px;
  top: 50px;
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
