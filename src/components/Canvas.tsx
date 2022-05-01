import React, { useMemo } from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { createLife, createGeneration } from '../core';
import { generateRandomColors } from '../utils';

const cellSize = 60;
const colortThreshold = 100;
const numOfInitialCells = 100;
const frameRates = 60;
const showGridLines = true;
const enableRandomColorGeneration = true;
let dimensions = {
  width: window.innerWidth,
  height: window.innerHeight,
};
let columns = Math.ceil(dimensions.width / cellSize);
let rows = Math.ceil(dimensions.height / cellSize);
let colors = generateRandomColors(colortThreshold);
let livingCells = createLife([columns, rows], numOfInitialCells);

const Canvas: React.FC = () => {
  let counterElement: p5Types.Element;

  const cell = (p5: p5Types, x: number, y: number): void => {
    p5.fill(colors.foreground);
    p5.rect(x, y, cellSize, cellSize);
    p5.noStroke();
  };

  const setup = (p5: p5Types, canvasParentRef: Element): void => {
    const { width, height } = dimensions;
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background(colors.background);
    p5.frameRate(frameRates);
    counterElement = p5.createSpan();
    counterElement.addClass('counter');
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

  const draw = (p5: p5Types): void => {
    p5.background(colors.background);
    for (let i = 0; i < livingCells.length; i++) {
      const livingCellsX = livingCells[i][0] * cellSize;
      const livingCellsY = livingCells[i][1] * cellSize;
      cell(p5, livingCellsX, livingCellsY);
    }

    if (showGridLines) drawGridLines(p5);

    // Issue in this function
    // createGeneration([dimensions.width, dimensions.height], livingCells);
    // console.log(livingCells.length);
    counterElement.html(`${Math.floor(p5.frameRate())} Fps`);
  };

  const mouseClicked = (p5: p5Types, event: MouseEvent): void => {
    if (
      event.target === document.getElementById('defaultCanvas0') &&
      enableRandomColorGeneration
    )
      colors = generateRandomColors(colortThreshold);
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

  return (
    <Sketch
      setup={setup}
      draw={draw}
      mouseClicked={mouseClicked}
      windowResized={windowResized}
    />
  );
};

export default Canvas;
