import React from 'react';

interface ExternalLinkPropos {
  link?: string;
  children: React.ReactNode;
}

export default function ExternalLink({ link, children }: ExternalLinkPropos) {
  return (
    <a href={link || '#'} target={'_blank'} rel="noreferrer noopener">
      {children}
    </a>
  );
}
