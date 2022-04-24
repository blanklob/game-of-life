import React from 'react';
import Sketch from 'react-p5';
import p5Types from 'p5';

const getRandomInt = (max: number) => {
  return Math.floor(Math.random() * max);
};

export default function Canvas() {
  const sphere = (p5: p5Types, x: number, y: number, a: number, b: number) => {
    let c = p5.color(getRandomInt(255), getRandomInt(255), getRandomInt(255));
    p5.fill(c);
    p5.noStroke();
    p5.ellipse(x, y, a, b);
  };

  const setup = (p5: p5Types, canvasParentRef: Element) => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    let bound = 0;

    if (width > height) {
      bound = width;
    } else {
      bound = height;
    }

    p5.createCanvas(width, height).parent(canvasParentRef);
    console.log('createCanvas called');
    p5.background('white');

    for (let i = 0; i < 500; i++) {
      const randomSize = getRandomInt(500);
      sphere(
        p5,
        getRandomInt(bound),
        getRandomInt(bound),
        randomSize,
        randomSize,
      );
    }
  };

  const draw = (p5: p5Types) => {
    // console.log('draw');
  };

  return <Sketch setup={setup} draw={draw} />;
}
