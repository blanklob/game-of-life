import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Generation, Cell } from '../core';
import {
  generateRandomColors,
  isTouchDevice,
  changeThemeColor,
  changeFaviconColor,
} from '../utils';

let dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};

const frameRates = 30;
let [canvasScrollX, canvasScrollY] = [0, 0];
let canvas: p5Types.Renderer;

interface CanvasProps {
  showGridLines: boolean;
  showCells: boolean;
  showBenchmark: boolean;
  enableRandomColorGeneration: boolean;
  colorThreshold: number;
  scaleFactor: number;
}

const Canvas = ({
  showGridLines,
  showCells,
  showBenchmark,
  enableRandomColorGeneration,
  colorThreshold,
  scaleFactor,
}: CanvasProps) => {
  let counterElement: p5Types.Element;
  let timeElement: p5Types.Element;
  let cellsCounterElement: p5Types.Element;
  let livingCellsCounterElement: p5Types.Element;
  let initialCellsCounterElement: p5Types.Element;
  let cellTooltipElement: p5Types.Element;
  let pauseGame: boolean = false;
  let colors = generateRandomColors(colorThreshold);

  const cellSize = isTouchDevice() ? 6 * scaleFactor : 10 * scaleFactor;

  let [columns, rows] = [
    Math.ceil((dimensions.width * scaleFactor) / cellSize),
    Math.ceil((dimensions.height * scaleFactor) / cellSize),
  ];
  let generation = new Generation(columns, rows, colors.foreground);

  const cell = (p5: p5Types, currentCell: Cell): void => {
    const { id, positionX, positionY, numOfNeighbours, color } = currentCell;
    const x = positionX * cellSize;
    const y = positionY * cellSize;

    const cellColor = p5.color(color);

    if (mouseOverCell(p5, x + canvasScrollX, y + canvasScrollY)) {
      cellColor.setAlpha(255 * Math.abs(p5.sin(p5.millis() / 200) / 2));
      p5.fill(cellColor);
      if (showBenchmark)
        drawCellTooltip(
          p5,
          x + canvasScrollX,
          y + canvasScrollY,
          id,
          numOfNeighbours,
        );
    } else {
      cellColor.setAlpha(255);
      p5.fill(cellColor);
    }

    p5.rect(x + canvasScrollX, y + canvasScrollY, cellSize, cellSize);
    if (showGridLines) p5.noStroke();
    else p5.stroke(colors.background);
  };

  const drawCellTooltip = (
    p5: p5Types,
    x: number,
    y: number,
    id: number,
    numOfNeighbours: number,
  ): void => {
    const tooltipOffset = 25;
    cellTooltipElement.show();
    cellTooltipElement.html(
      `Cell Id #${id} <br /> Neighbours ${numOfNeighbours}`,
    );

    // Constraint the tooltip to the screen
    if (p5.winMouseX >= 80 && p5.winMouseY >= 80)
      cellTooltipElement.position(x - tooltipOffset * 2, y - tooltipOffset * 2);
    else if (p5.winMouseX < 80 && p5.winMouseY >= 80)
      cellTooltipElement.position(
        x - tooltipOffset * -1,
        y - tooltipOffset * 2,
      );
    else if (p5.winMouseX >= 80 && p5.winMouseY < 80)
      cellTooltipElement.position(
        x - tooltipOffset * 2,
        y - tooltipOffset * -1,
      );
    else
      cellTooltipElement.position(
        x - tooltipOffset * -1,
        y - tooltipOffset * -1,
      );
  };

  const benchmark = (p5: p5Types): void => {
    const currentFrameRates = Math.floor(p5.frameRate());
    const currentTime = Math.ceil(p5.millis() / 1000);
    const cellsLeftInGeneration = generation.numOfLivingCells;

    counterElement.html(`${currentFrameRates} Fps`);
    timeElement.html(`${currentTime} Seconds`);
    livingCellsCounterElement.html(`${cellsLeftInGeneration} Cells Left`);
  };

  const setup = (p5: p5Types, canvasParentRef: Element): void => {
    const { width, height } = dimensions;
    canvas = p5
      .createCanvas(width, height)
      .parent(canvasParentRef)
      .id('canvas');

    p5.background(colors.background);
    p5.frameRate(frameRates);

    canvas.mouseWheel((event) => {
      canvasScrollX += 0.2 * event.wheelDeltaX;
      canvasScrollY += 0.2 * event.wheelDeltaY;
    });

    if (showBenchmark) {
      counterElement = p5.createSpan();
      timeElement = p5.createSpan();
      cellsCounterElement = p5.createSpan();
      livingCellsCounterElement = p5.createSpan();
      initialCellsCounterElement = p5.createSpan();
      cellTooltipElement = p5.createSpan();

      counterElement.addClass('counter');
      timeElement.addClass('time');
      cellsCounterElement.addClass('cells');
      livingCellsCounterElement.addClass('living-cells');
      initialCellsCounterElement.addClass('intial-living-cells');
      cellTooltipElement.addClass('tooltip');

      initialCellsCounterElement.html(
        `${generation.numOfInitialCells} Initial Cells`,
      );
      cellsCounterElement.html(`${columns * rows} Total Cells`);
    }
  };

  const drawGridLines = (p5: p5Types): void => {
    p5.stroke(colors.foreground);
    // Draw horizontal lines
    for (let i = 0; i < rows; i++) {
      p5.line(0, i * cellSize, dimensions.width, i * cellSize);
    }

    // Draw vertical lines
    for (let i = 0; i < columns; i++) {
      p5.line(i * cellSize, 0, i * cellSize, dimensions.height);
    }
  };

  const metaManipulation = (p5: p5Types): void => {
    changeThemeColor(p5.color(colors.foreground).toString());
    changeFaviconColor(colors.foreground, colors.background);
    document.title = `Game of Life – ${generation.numOfLivingCells} Cells Left`;
  };

  const drawGeneration = (p5: p5Types): void => {
    if (!pauseGame) generation.new(colors.foreground);

    for (let i = 0; i < columns; i++) {
      for (let j = 0; j < rows; j++) {
        const currentCell = generation.cells[i][j];
        if (currentCell.isAlive) cell(p5, currentCell);
      }
    }
  };

  const cursor = (p5: p5Types): void => {
    p5.noStroke();
    p5.ellipse(
      p5.mouseX,
      p5.mouseY,
      (cellSize * scaleFactor) / 4,
      (cellSize * scaleFactor) / 4,
    );
  };

  const draw = (p5: p5Types): void => {
    p5.background(colors.background);

    metaManipulation(p5);
    if (showBenchmark) benchmark(p5);
    if (showGridLines) drawGridLines(p5);
    if (showCells) drawGeneration(p5);

    cursor(p5);
  };

  const mouseClicked = (p5: p5Types, event: MouseEvent): void => {
    if (
      event.target === document.getElementById('canvas') &&
      enableRandomColorGeneration
    ) {
      colors = generateRandomColors(colorThreshold);
    } else if (event.target === document.getElementById('pause')) {
      pauseGame = !pauseGame;
    } else if (event.target === document.getElementById('restart')) {
      generation = new Generation(columns, rows, colors.foreground);
      cellTooltipElement.hide();
    }
  };

  const windowResized = (p5: p5Types) => {
    dimensions = {
      width: window.innerWidth,
      height: window.innerHeight,
    };
    columns = Math.ceil(dimensions.width / cellSize);
    rows = Math.ceil(dimensions.height / cellSize);
    p5.resizeCanvas(dimensions.width, dimensions.height);
  };

  const mouseOverCell = (p5: p5Types, x: number, y: number): boolean => {
    if (
      p5.mouseX >= x &&
      p5.mouseX <= x + cellSize &&
      p5.mouseY >= y &&
      p5.mouseY <= y + cellSize
    ) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <Sketch
      setup={setup}
      draw={draw}
      // @ts-ignore
      mouseClicked={mouseClicked}
      windowResized={windowResized}
    />
  );
};

export default Canvas;
