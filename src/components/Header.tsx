import React from 'react';
import Dashboard from './Dashboard';

export default function Header() {
  return (
    <header>
      <nav role={'navigation'}>
        <ul role={'list'}>
          <li className="logo">
            <p>Game Of Life</p>
          </li>
          <li>
            <Dashboard />
          </li>
        </ul>
      </nav>
    </header>
  );
}
