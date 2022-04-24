import React, { useState } from 'react';
import Dashboard from './components/Dashboard';
import Header from './components/Header';
import Canvas from './components/Canvas';
import './index.css';
import Footer from './components/Footer';

export default function App() {
  const [count, setCount] = useState(0);

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
