/*
 * Game of Life
 *
 * The state of a cell is determined by its neighbours,
 * and 4 simple rules determine whether the given state will live or die.
 * in two-dimensional Grid of cells, each cell is eather alive or dead.
 *
 * #1 Rule: Survival. Every cell with two or three neighbors survives to the next generation.
 * #2 Rule: Overpopulation. Each cell with four or more neighbors dies from Overpopulation.
 * #3 Rule: Isolation. Each cell with one neighbor or none dies from isolation.
 * #4 Rule: Reproduction: Any dead cell with exactly three neighbours becomes a living cell.
 *
 */

import { getRandomInt } from '../utils';

export interface livingCells {
  [id: string]: Cell;
}

export class Cell {
  readonly id: number;
  columns: number;
  rows: number;
  positionX: number;
  positionY: number;
  isAlive: Boolean;
  numOfNeighbours: number;
  static count: number = 0;

  constructor(columns: number, rows: number, isAlive: boolean = true) {
    // Cell's ID is the 2d coords in the grid.
    this.id = ++Cell.count;
    this.columns = columns;
    this.rows = rows;
    this.positionX = getRandomInt(this.columns);
    this.positionY = getRandomInt(this.rows);
    this.isAlive = isAlive;
    this.numOfNeighbours = 0;
  }

  countNeighbours(livingCells: livingCells): number {
    /**
     * @description Checks how many alive neighbours a cell has
     * and sends the number .
     *
     * @param {array} livingCells - The coordinantes of the cell to check.
     * @return {number} - Number of living neighbour cells.
     */

    let numOfAliveNeighbourCells = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // To prevent counting the current cell if it's alive.
        if (i === 0 && j === 0) continue;

        const neighbourCell = {
          positionX: (this.positionX + i + this.columns) % this.columns,
          positionY: (this.positionY + j + this.rows) % this.rows,
        };

        const neighbourCellID = `${neighbourCell.positionX}${neighbourCell.positionY}`;

        const isNeighbourCellAlive = livingCells[neighbourCellID] !== undefined;

        if (isNeighbourCellAlive) numOfAliveNeighbourCells++;
      }
    }

    return numOfAliveNeighbourCells;
  }
}

export interface GenerationType {
  columns: number;
  rows: number;
  livingCells: livingCells;
  numOfInitialCells: number;
  maxNumOfCells: number;
}

export class Generation implements GenerationType {
  livingCells: livingCells;
  columns: number;
  rows: number;
  numOfInitialCells: number;
  maxNumOfCells: number;

  constructor(columns: number, rows: number, numOfInitialCells: number) {
    /**
     * @description Creates the first cells (generation zero) in the grid randomly.
     *
     * @param {number} numOfInitialCells - The number of initials cells in the grid.
     */

    this.livingCells = {};
    this.numOfInitialCells = numOfInitialCells;
    this.columns = columns;
    this.rows = rows;
    this.maxNumOfCells = this.columns * this.rows;

    // Limit the number of initial cells to max num of Cells, if it's surpasses the grid limit.
    if (this.numOfInitialCells > this.maxNumOfCells)
      this.numOfInitialCells = this.maxNumOfCells;

    while (this.numOfInitialCells > 0) {
      const cell = new Cell(this.columns, this.rows);
      const cellID = `${cell.positionX}${cell.positionY}`;

      const isCellAlreadyExist = this.livingCells[cellID] !== undefined;

      if (!isCellAlreadyExist) {
        this.livingCells[cellID] = cell;
        this.numOfInitialCells--;
      }
    }
  }

  new(): void {
    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        const currentCellID = `${i}${j}`;
        const isCurrentCellAlive =
          this.livingCells[currentCellID] !== undefined;

        // TODO: Check for dead cells (Make countNeighbours global)
        // const currentCellNeighboursCount = cell.countNeighbours(
        //   this.livingCells,
        // );

        const currentCellNeighboursCount = globalCountNeighbours(
          this.columns,
          this.rows,
          this.livingCells,
          [i, j],
        );

        // Checking game of lifes rules.
        if (
          (isCurrentCellAlive && currentCellNeighboursCount == 2) ||
          currentCellNeighboursCount == 3
        ) {
          continue;
        } else if (!isCurrentCellAlive && currentCellNeighboursCount == 3) {
          // If the cell is dead and has three neighbours, it becomes a living cell.
          this.livingCells[currentCellID] = new Cell(this.columns, this.rows);
        } else {
          // This removed the living cell from the living cells generation array.
          delete this.livingCells[currentCellID];
        }
      }
    }
  }
}

const globalCountNeighbours = (
  columns: number,
  rows: number,
  livingCells: livingCells,
  cellCoords: Array<number>,
): number => {
  /**
   * @description Checks how many alive neighbours a cell has
   * and sends the number .
   *
   * @param {array} livingCells - The coordinantes of the cell to check.
   * @return {number} - Number of living neighbour cells.
   */

  let numOfAliveNeighbourCells = 0;
  const [positionX, positionY] = cellCoords;

  for (let i = -1; i <= 1; i++) {
    for (let j = -1; j <= 1; j++) {
      // To prevent counting the current cell if it's alive.
      if (i === 0 && j === 0) continue;

      const neighbourCell = {
        positionX: (positionX + i + columns) % columns,
        positionY: (positionY + j + rows) % rows,
      };

      const neighbourCellID = `${neighbourCell.positionX}${neighbourCell.positionY}`;

      const isNeighbourCellAlive = livingCells[neighbourCellID] !== undefined;

      if (isNeighbourCellAlive) numOfAliveNeighbourCells++;
    }
  }

  return numOfAliveNeighbourCells;
};
