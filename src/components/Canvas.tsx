import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { Generation } from '../core';
import { generateRandomColors } from '../utils';

const cellSize = 20;
const colortThreshold = 100;
const numOfInitialCells = 1000;
const frameRates = 60;
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
let colors = generateRandomColors(colortThreshold);
const generation = new Generation(columns, rows, numOfInitialCells);

const Canvas: React.FC = () => {
  let counterElement: p5Types.Element;
  let timeElement: p5Types.Element;

  const cell = (p5: p5Types, x: number, y: number): void => {
    p5.fill(colors.foreground);
    p5.rect(x, y, cellSize, cellSize);
    p5.noStroke();
  };

  const benchmark = (p5: p5Types): void => {
    const currentFrameRates = Math.floor(p5.frameRate());
    const currentTime = Math.ceil(p5.frameCount / 60);

    counterElement.html(`${currentFrameRates} Fps`);
    timeElement.html(`${currentTime} Seconds`);
  };

  const setup = (p5: p5Types, canvasParentRef: Element): void => {
    const { width, height } = dimensions;
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background(colors.background);
    p5.frameRate(frameRates);

    if (showBenchmark) {
      counterElement = p5.createSpan();
      timeElement = p5.createSpan();
      counterElement.addClass('counter');
      timeElement.addClass('time');
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
      cell(
        p5,
        currentCell.positionX * cellSize,
        currentCell.positionY * cellSize,
      );
    }
    generation.create();
  };

  const draw = (p5: p5Types): void => {
    p5.background(colors.background);

    if (showCells) drawGeneration(p5);
    // if (showCells) drawCells(p5);
    if (showGridLines) drawGridLines(p5);
    if (showBenchmark) benchmark(p5);
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
