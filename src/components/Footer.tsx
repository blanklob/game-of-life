import React, { Children } from 'react';

export default function Footer() {
  return (
    <footer role="footer">
      <ul role="list">
        <li>By</li>
        <li>
          <ExternalLink>Youness</ExternalLink>
        </li>
        <li>
          <ExternalLink>Julien</ExternalLink>
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

interface ExternalLinkPropos {
  link?: string;
  children: React.ReactNode;
}

export function ExternalLink({ link, children }: ExternalLinkPropos) {
  return (
    <a href={link || '#'} target={'_blank'} rel="noreferrer noopener">
      {children}
    </a>
  );
}
