import React, { JSX } from 'react';
import clsx from 'clsx';

type SubHeadingProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  style?: string;
  className?: string;
};

export default function SubHeading({
  children,
  as: Component = 'h3',
  style,
  className,
}: SubHeadingProps) {
  return (
    <Component className={clsx('subheading', className, style)}>
      {children}
    </Component>
  );
}
