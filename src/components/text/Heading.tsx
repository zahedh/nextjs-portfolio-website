import React, { JSX } from 'react';
import clsx from 'clsx';

type HeadingProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements; // Allows 'h1'–'h6'
  className?: string;
};

export default function Heading({
  children,
  as: Component = 'h2',
  className,
}: HeadingProps) {
  return (
    <Component className={clsx('heading', className)}>{children}</Component>
  );
}
