import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Generation, Cell } from '../core';
import { generateRandomColors, isTouchDevice } from '../utils';

const cellSize = 30;
const numOfInitialCells = isTouchDevice()
  ? Math.floor((30 * 100) / cellSize)
  : Math.floor((150 * 100) / cellSize);
console.log(numOfInitialCells);

const colorThreshold = 100;
const frameRates = 30;
const showGridLines = true;
const showCells = true;
const showBenchmark = true;
const enableRandomColorGeneration = true;
let dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let columns = Math.ceil(dimensions.width / cellSize);
let rows = Math.ceil(dimensions.height / cellSize);
let colors = generateRandomColors(colorThreshold);
let generation = new Generation(columns, rows, numOfInitialCells);

const Canvas: React.FC = () => {
  let counterElement: p5Types.Element;
  let timeElement: p5Types.Element;
  let cellsCounterElement: p5Types.Element;
  let cellTooltipElement: p5Types.Element;

  const cell = (p5: p5Types, currentCell: Cell): void => {
    const { id, positionX, positionY, numOfNeighbours } = currentCell;
    const x = positionX * cellSize;
    const y = positionY * cellSize;

    const cellColor = p5.color(colors.foreground);

    if (mouseOverCell(p5, x, y)) {
      cellColor.setAlpha(255 * Math.abs(p5.sin(p5.millis() / 200) / 2));
      p5.fill(cellColor);
      if (showBenchmark) drawCellTooltip(p5, x, y, id, numOfNeighbours);
    } else {
      cellColor.setAlpha(255);
      p5.fill(cellColor);
    }

    p5.rect(x, y, cellSize, cellSize);
    p5.noStroke();
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
    const cellsLeftInGeneration = Object.keys(generation.livingCells).length;

    counterElement.html(`${currentFrameRates} Fps`);
    timeElement.html(`${currentTime} Seconds`);
    cellsCounterElement.html(`${cellsLeftInGeneration} Cells Left`);
  };

  const setup = (p5: p5Types, canvasParentRef: Element): void => {
    const { width, height } = dimensions;
    p5.createCanvas(width, height).parent(canvasParentRef).id('canvas');

    p5.background(colors.background);
    p5.frameRate(frameRates);

    if (showBenchmark) {
      counterElement = p5.createSpan();
      timeElement = p5.createSpan();
      cellsCounterElement = p5.createSpan();
      cellTooltipElement = p5.createSpan();

      counterElement.addClass('counter');
      timeElement.addClass('time');
      cellsCounterElement.addClass('cells');
      cellTooltipElement.addClass('tooltip');
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

  const drawGeneration = (p5: p5Types): void => {
    for (const cellID in generation.livingCells) {
      const currentCell = generation.livingCells[cellID];
      cell(p5, currentCell);
    }
    generation.new();
  };

  const draw = (p5: p5Types): void => {
    p5.background(colors.background);

    if (showBenchmark) benchmark(p5);
    if (showCells) drawGeneration(p5);
    if (showGridLines) drawGridLines(p5);
  };

  const mouseClicked = (p5: p5Types, event: MouseEvent): void => {
    if (
      event.target === document.getElementById('canvas') &&
      enableRandomColorGeneration
    ) {
      colors = generateRandomColors(colorThreshold);
    } else if (event.target === document.getElementById('pause')) {
      if (p5.isLooping()) p5.noLoop();
      else p5.loop();
    } else if (event.target === document.getElementById('restart')) {
      generation = new Generation(columns, rows, numOfInitialCells);
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
