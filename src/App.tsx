import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Canvas from './components/Canvas';
import './index.css';

export default function App() {
  return (
    <div>
      <Header />
      <main id="MainContent" tabIndex={-1} role="main">
        <Canvas />
      </main>
      <Footer />
    </div>
  );
}
