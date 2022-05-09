import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Canvas from './components/Canvas';
import Window from './components/Window';
import useStore from './hooks';

export default function App() {
  const {
    showGridLines,
    colorThreshold,
    scaleFactor,
    enableRandomColorGeneration,
  } = useStore((state) => state);

  return (
    <div>
      <Header />
      <main id="MainContent" tabIndex={-1} role="main">
        <Window />
        <Canvas
          showCells
          showGridLines={showGridLines}
          enableRandomColorGeneration={enableRandomColorGeneration}
          colorThreshold={colorThreshold}
          scaleFactor={scaleFactor}
        />
      </main>
      <Footer />
    </div>
  );
}
