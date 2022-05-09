import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Canvas from './components/Canvas';
import Window from './components/Window';

export default function App() {
  return (
    <div>
      <Header />
      <main id="MainContent" tabIndex={-1} role="main">
        <Window />
        <Canvas
          showGridLines={false}
          showCells
          showBenchmark
          enableRandomColorGeneration
          colorThreshold={100}
          scaleFactor={1}
        />
      </main>
      <Footer />
    </div>
  );
}
