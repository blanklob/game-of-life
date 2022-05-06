import React from 'react';
import Dashboard from './Dashboard';
import ExternalLink from './ExternalLink';

export default function Header() {
  document.addEventListener(
    'keydown',
    (event: KeyboardEvent) => {
      if (event.key === 'SPACE') {
        toggleFullScreen();
      }
    },
    false,
  );

  const toggleFullScreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  };

  return (
    <header>
      <nav role={'navigation'}>
        <ul role={'list'}>
          <li className="logo">
            <a href="/">Game Of Life</a>
            <ExternalLink link="https://github.com/idbakkasse/game-of-life">
              ./src
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
