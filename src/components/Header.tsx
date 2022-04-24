import React from 'react';
import Dashboard from './Dashboard';
import ExternalLink from './ExternalLink';

export default function Header() {
  return (
    <header>
      <nav role={'navigation'}>
        <ul role={'list'}>
          <li className="logo">
            <a href="/">Game Of Life</a>
            <ExternalLink link="https://github.com/JulienFRANCOIS-Hetic/game_of_life">
              Source Code
            </ExternalLink>
          </li>
          <li>
            <Dashboard />
          </li>
        </ul>
      </nav>
    </header>
  );
}
