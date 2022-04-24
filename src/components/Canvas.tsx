import React, { useRef } from 'react';

export default function Canvas() {
  const ref = useRef(null);

  return (
    <>
      <canvas ref={ref} id="GameCanvas"></canvas>
    </>
  );
}
