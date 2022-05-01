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

import { arrayIncludes, removeItemFromArray, getRandomInt } from '../utils';

export function createGeneration(
  dimensions: [number, number],
  livingCellsGeneration: aliveCellsArrayType,
): aliveCellsArrayType {
  /**
   * @description Checks how many neighbors a cell has and returns
   *
   * @return {array} - Number of living neighbour cells.
   */

  const [columns, rows] = dimensions;

  for (let i = 0; i < columns; i++) {
    for (let j = 0; j < rows; j++) {
      const currentCell: [number, number] = [i, j];
      // Todo array includes utiles has a problem
      const currentCellIsAlive = arrayIncludes(
        livingCellsGeneration,
        currentCell,
      );

      const currentCellNeighboursCount = countCellNeighbours(
        dimensions,
        currentCell,
        livingCellsGeneration,
      );

      // Checking game of lifes rules.
      if (
        (currentCellIsAlive && currentCellNeighboursCount == 2) ||
        currentCellNeighboursCount == 3
      ) {
        continue;
      } else if (!currentCellIsAlive && currentCellNeighboursCount == 3) {
        // If the cell is dead and has three neighbours, it becomes a living cell.
        livingCellsGeneration.push(currentCell);
      } else {
        // This removed the living cell from the living cells generation array.
        if (currentCellIsAlive) {
          livingCellsGeneration = removeItemFromArray(
            livingCellsGeneration,
            currentCell,
          );
        }
      }
    }
  }

  return livingCellsGeneration;
}

interface CellsType {
  columns: number;
  rows: number;
  positionX: number;
  positionY: number;
  isAlive: Boolean;
  numOfNeighbours: number;
}

interface livingCellsType {
  [id: string]: CellsType;
}

export class Cell implements CellsType {
  columns: number;
  rows: number;
  positionX: number;
  positionY: number;
  isAlive: Boolean;
  numOfNeighbours: number;

  constructor(columns: number, rows: number, isAlive: boolean = true) {
    this.columns = columns;
    this.rows = rows;
    this.positionX = getRandomInt(this.columns);
    this.positionY = getRandomInt(this.rows);
    this.isAlive = isAlive;
    this.numOfNeighbours = 0;
  }

  countNeighbours(livingCells: livingCellsType): number {
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

        const cellID = `${neighbourCell.positionX}${neighbourCell.positionY}`;

        const isNeighbourCellAlive = livingCells[cellID] !== undefined;

        if (isNeighbourCellAlive) numOfAliveNeighbourCells++;
      }
    }

    return numOfAliveNeighbourCells;
  }
}

export interface GenerationType {
  columns: number;
  rows: number;
  livingCells: livingCellsType;
  numOfInitialCells: number;
  maxNumOfCells: number;
}

export class Generation implements GenerationType {
  livingCells: livingCellsType;
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

  run(): void {}
}
