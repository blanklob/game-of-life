/*
 * Game of Life
 *
 * The state of a cell is determined by its neighbours,
 * and 4 simple rules determine whether the given state will live or die.
 * in two-dimensional Grid of cells, each cell is eather alive or dead.
 *
 * #1 Rule: Survival. Every cell with two or three neighbors survives to the next generation.
 * #2 Rule: Overpopulation. Each cell with four or more neighbors dies from Overpopulation.
 * #3 Rule: Loneliness. Each cell with one neighbor or none dies from isolation.
 * #4 Rule: Reproduction: Any dead cell with exactly three neighbours becomes a living cell.
 *
 */

import { getRandomInt, create2DMatrix } from '../utils';

export type Cells = Array<Array<Cell>>;

export interface GenerationType {
  columns: number;
  rows: number;
  cells: Cells;
  maxNumOfCells: number;
}

export class Cell {
  readonly id: number = 0;
  positionX: number;
  positionY: number;
  isAlive?: Boolean;
  numOfNeighbours: number;

  constructor(positionX: number, positionY: number, isAlive?: boolean) {
    // Cell's ID is the 2d coords in the grid.
    this.id = parseInt(`${positionX}${positionY}`);
    this.positionX = positionX;
    this.positionY = positionY;
    this.isAlive = isAlive ?? getRandomInt(15) === 1;
    this.numOfNeighbours = 0;
  }
}

export class Generation implements GenerationType {
  columns: number;
  rows: number;
  cells: Cells;
  oldCells: Cells;
  maxNumOfCells: number;
  numOfLivingCells: number;
  numOfInitialCells: number;

  constructor(columns: number, rows: number) {
    /**
     * @description Creates the first cells (generation zero) in the grid randomly.
     *
     * @param {number} columns - The number of columns in the grid.
     * @param {number} rows - The number of rows cells in the grid.
     */

    this.columns = columns;
    this.rows = rows;
    this.cells = create2DMatrix(this.columns, this.rows);
    this.maxNumOfCells = this.columns * this.rows;
    this.numOfLivingCells = 0;

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        if (i === 0 || j === 0 || i === this.columns - 1 || j >= this.rows - 2)
          this.cells[i][j] = new Cell(i, j, false);
        else {
          this.cells[i][j] = new Cell(i, j);
          if (this.cells[i][j].isAlive) this.numOfLivingCells++;
        }
      }
    }

    this.oldCells = this.cells;
    this.numOfInitialCells = this.numOfLivingCells;
  }

  new(): void {
    this.oldCells = this.cells;

    for (let i = 0; i < this.columns; i++) {
      for (let j = 0; j < this.rows; j++) {
        const currentCell = this.oldCells[i][j];
        currentCell.numOfNeighbours =
          this.countNeighbourLivingCells(currentCell);

        if (currentCell.isAlive && currentCell.numOfNeighbours < 2) {
          this.cells[i][j].isAlive = false; // Loneliness
          this.numOfLivingCells--;
        } else if (currentCell.isAlive && currentCell.numOfNeighbours > 3) {
          this.cells[i][j].isAlive = false; // Overpopulation
          this.numOfLivingCells--;
        } else if (!currentCell.isAlive && currentCell.numOfNeighbours == 3) {
          this.cells[i][j].isAlive = true; // Reproduction
          this.numOfLivingCells++;
        } else this.cells[i][j].isAlive = currentCell.isAlive; // Survival
      }
    }
  }

  countNeighbourLivingCells(cell: Cell): number {
    /**
     * @description Checks how many alive neighbours a cell has
     * and sends the number .
     *
     * @param {array} cell - The cell to check.
     * @return {number} - Number of living neighbour cells.
     */

    let numOfAliveNeighbourCells = 0;

    for (let i = -1; i <= 1; i++) {
      for (let j = -1; j <= 1; j++) {
        // To prevent counting the current cell if it's alive.
        if (i === 0 && j === 0) continue;

        const neighbourCell = {
          positionX: (cell.positionX + i + this.columns) % this.columns,
          positionY: (cell.positionY + j + this.rows) % this.rows,
        };

        const isNeighbourCellAlive =
          this.oldCells[neighbourCell.positionX][neighbourCell.positionY]
            .isAlive;

        if (isNeighbourCellAlive) numOfAliveNeighbourCells++;
      }
    }

    return numOfAliveNeighbourCells;
  }
}
