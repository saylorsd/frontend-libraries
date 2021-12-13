import React from 'react';

/**
 *
 * Heading types
 *
 **/

type Headings = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';

export interface HeadingProps extends React.ComponentPropsWithRef<Headings> {
  level: HeadingLevel;
}

export type HeadingLevel = 1 | 2 | 3 | 4 | 5 | 6;
