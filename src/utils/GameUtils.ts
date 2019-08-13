import Player from '@/constants/Players';

export default class GameUtils {
  // TODO: Refactor
  public static checkMatchingPatterns(
    board: number[],
    currentIndex: number,
    currentPlayer: Player,
    size: number
  ): [number, number, number] | null {
    const possibleSolutionIndices: Array<[number, number]> = [];
    const neighbours = this.getNeighbours(currentIndex, size);

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
          const [nx, ny] = this.getCoordinateByIndex(neighbours[key], size);

          switch (key) {
            case 'LEFT':
              nextIndexToCheck = this.getIndexByCoordinate(nx, ny - 1, size);
              break;
            case 'RIGHT':
              nextIndexToCheck = this.getIndexByCoordinate(nx, ny + 1, size);
              break;
            case 'TOP':
              nextIndexToCheck = this.getIndexByCoordinate(nx - 1, ny, size);
              break;
            case 'BOTTOM':
              nextIndexToCheck = this.getIndexByCoordinate(nx + 1, ny, size);
              break;
            case 'TOP_RIGHT':
              nextIndexToCheck = this.getIndexByCoordinate(
                nx - 1,
                ny + 1,
                size
              );
              break;
            case 'BOTTOM_LEFT':
              nextIndexToCheck = this.getIndexByCoordinate(
                nx + 1,
                ny - 1,
                size
              );
              break;
            case 'TOP_LEFT':
              nextIndexToCheck = this.getIndexByCoordinate(
                nx - 1,
                ny - 1,
                size
              );
              break;
            case 'BOTTOM_RIGHT':
              nextIndexToCheck = this.getIndexByCoordinate(
                nx + 1,
                ny + 1,
                size
              );
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

  public static getNeighbours(
    currentIndex: number,
    size: number
  ): { [key: string]: number } {
    const neighbours: { [key: string]: number } = {};
    const [x, y] = this.getCoordinateByIndex(currentIndex, size);
    neighbours.LEFT = this.getIndexByCoordinate(x, y - 1, size);
    neighbours.RIGHT = this.getIndexByCoordinate(x, y + 1, size);
    neighbours.TOP = this.getIndexByCoordinate(x - 1, y, size);
    neighbours.BOTTOM = this.getIndexByCoordinate(x + 1, y, size);
    neighbours.TOP_RIGHT = this.getIndexByCoordinate(x - 1, y + 1, size);
    neighbours.BOTTOM_LEFT = this.getIndexByCoordinate(x + 1, y - 1, size);
    neighbours.TOP_LEFT = this.getIndexByCoordinate(x - 1, y - 1, size);
    neighbours.BOTTOM_RIGHT = this.getIndexByCoordinate(x + 1, y + 1, size);
    return neighbours;
  }

  /**
   * Get the 1D array co-ordinate given the 2d array address
   * @param index index in the 1D array
   * @param size width of the 2d array
   */
  private static getCoordinateByIndex(
    index: number,
    size: number
  ): [number, number] {
    return [Math.floor(index / size), index % size];
  }

  /**
   * Get the 1D array index for a 2D array coordinate
   * @param x row number of the 2d array
   * @param y column number of the 2d array
   * @param size width of the 2d array; id index does not exsist return -1
   */
  private static getIndexByCoordinate(
    x: number,
    y: number,
    size: number
  ): number {
    if (x < 0 || y < 0 || x >= size || y >= size) {
      return -1;
    }
    return x * size + y;
  }
}
