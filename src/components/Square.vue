<template>
  <td class="square" @click="mark()" :class="{invalid: isInvalid}">{{getSquareContent}}</td>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '../store';

@Component
export default class Square extends Vue {
  @Prop() private index!: number;
  private isInvalid: boolean = false;

  private mark() {
    if (!this.isMarked()) {
      store.dispatch('markAsPlayed', this.index);
    } else {
      this.isInvalid = true;
      setTimeout(() => {
        this.isInvalid = false;
      }, 1000);
    }
  }
  private isMarked() {
    return store.state.board[this.index] === -1 ? false : true;
  }

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
.invalid {
  transition: all 0.5s ease-in-out;
  background-color: #ec903b9a !important;
}
.square {
  transition: all 0.5s ease-in-out;
  background-color: #ffffff;
}
</style>