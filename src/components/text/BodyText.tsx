import React, { JSX } from 'react';
import clsx from 'clsx';

type BodyTextProps = {
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  style?: string;
  className?: string;
};

export default function BodyText({
  children,
  as: Component = 'p',
  style,
  className,
}: BodyTextProps) {
  return (
    <Component className={clsx('body-text', className, style)}>
      {children}
    </Component>
  );
}
