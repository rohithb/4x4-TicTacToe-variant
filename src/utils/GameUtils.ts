import Player from '@/constants/Players';

export default class GameUtils {
  // TODO: Refactor
  public static checkPoints(
    board: number[],
    currentIndex: number,
    currentPlayer: Player,
    size: number
  ): [number, number, number] | null {
    const possibleSolutionIndices: Array<[number, number]> = [];
    // const matchingIndices: [number, number, number];
    const neighbours: { [key: string]: number } = {
      LEFT: currentIndex - 1, // left
      RIGHT: currentIndex + 1, // right
      TOP: currentIndex - size, // top
      BOTTOM: currentIndex + size, // bottom
      TOP_RIGHT: currentIndex - (size - 1), // top right
      BOTTOM_LEFT: currentIndex + (size - 1), // bottom left
      TOP_LEFT: currentIndex - (size + 1), // top left
      BOTTOM_RIGHT: currentIndex + (size + 1) // bottom right
    };

    // check left and right
    if (checkSameValueOrNot([neighbours.LEFT, neighbours.RIGHT])) {
      return [neighbours.LEFT, currentIndex, neighbours.RIGHT];
    }
    if (checkSameValueOrNot([neighbours.TOP, neighbours.BOTTOM])) {
      return [neighbours.TOP, currentIndex, neighbours.BOTTOM];
    }
    if (checkSameValueOrNot([neighbours.TOP_RIGHT, neighbours.BOTTOM_LEFT])) {
      return [neighbours.TOP_RIGHT, currentIndex, neighbours.BOTTOM_LEFT];
    }
    if (checkSameValueOrNot([neighbours.TOP_LEFT, neighbours.BOTTOM_RIGHT])) {
      return [neighbours.TOP_LEFT, currentIndex, neighbours.BOTTOM_RIGHT];
    }

    // check for match in non neighboring squares
    for (const key in neighbours) {
      if (neighbours[key] >= 0 && neighbours[key] < board.length) {
        if (board[neighbours[key]] === currentPlayer) {
          let nextIndexToCheck: number = -1;
          switch (key) {
            case 'LEFT':
              nextIndexToCheck = neighbours[key] - 1;
              break;
            case 'RIGHT':
              nextIndexToCheck = neighbours[key] + 1;
              break;
            case 'TOP':
              nextIndexToCheck = neighbours[key] - size;
              break;
            case 'BOTTOM':
              nextIndexToCheck = neighbours[key] + size;
              break;
            case 'TOP_RIGHT':
              nextIndexToCheck = neighbours[key] - (size - 1);
              break;
            case 'BOTTOM_LEFT':
              nextIndexToCheck = neighbours[key] + (size - 1);
              break;
            case 'TOP_LEFT':
              nextIndexToCheck = neighbours[key] - (size + 1);
              break;
            case 'BOTTOM_RIGHT':
              nextIndexToCheck = neighbours[key] + (size + 1);
              break;
          }
          if (
            nextIndexToCheck >= 0 &&
            nextIndexToCheck < board.length &&
            board[nextIndexToCheck] === currentPlayer
          ) {
            return [currentIndex, neighbours[key], nextIndexToCheck];
          }
        }
      }
    }

    return null;

    /**
     * Check given 3 indices on board is played by speificed player
     * @param arr
     * @param player
     */
    function checkSameValueOrNot(arr: [number, number]): boolean {
      if (
        arr[0] >= 0 &&
        board[arr[0]] === currentPlayer &&
        arr[1] < board.length &&
        board[arr[1]] === currentPlayer
      ) {
        return true;
      }
      return false;
    }
  }
}
