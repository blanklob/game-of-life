import React from 'react';
import ExternalLink from './ExternalLink';

export default function Footer() {
  return (
    <footer role="footer">
      <ul role="list">
        <li>By</li>
        <li>
          <ExternalLink link="https://github.com/idbakkasse">
            Youness
          </ExternalLink>
        </li>
        <li>
          <ExternalLink link="https://github.com/JulienFRANCOIS-Hetic">
            Julien
          </ExternalLink>
        </li>
        <li>
          <ExternalLink>Alexandre</ExternalLink>
        </li>
        <li>
          <ExternalLink>Juan</ExternalLink>
        </li>
      </ul>
    </footer>
  );
}
