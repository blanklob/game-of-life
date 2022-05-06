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
        <Canvas />
      </main>
      <Footer />
    </div>
  );
}
