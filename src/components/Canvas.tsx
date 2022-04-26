import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';
import { createLife } from '../core';

const Canvas: React.FC = () => {
  const dimensions: [number, number] = [window.innerWidth, window.innerHeight];
  const cellSize = 10;
  const livingCells = createLife([
    window.innerWidth / cellSize,
    window.innerHeight / cellSize,
  ]);

  const cell = (p5: p5Types, x: number, y: number): void => {
    const color = p5.color(240);
    p5.fill(color);
    p5.rect(x, y, cellSize, cellSize);
    p5.noStroke();
  };

  const setup = (p5: p5Types, canvasParentRef: Element): void => {
    const [width, height] = dimensions;
    p5.createCanvas(width, height).parent(canvasParentRef);
    p5.background(0);
  };

  const draw = (p5: p5Types): void => {
    p5.background(0);

    for (let i = 0; i < livingCells.length; i++) {
      const livingCellsX = livingCells[i][0] * cellSize;
      const livingCellsY = livingCells[i][1] * cellSize;

      cell(p5, livingCellsX, livingCellsY);
    }
  };

  return <Sketch setup={setup} draw={draw} />;
};

export default Canvas;
