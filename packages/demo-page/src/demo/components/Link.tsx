/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import { Link as MUILink, LinkProps as MUILinkProps } from '@mui/material';

interface LinkProps extends MUILinkProps {
  children: ReactNode;
  newTab?: boolean;
}

export default function Link({
  href,
  children,
  newTab = false,
  ...rest
}: LinkProps) {
  if (newTab) {
    return (
      <MUILink href={href} target="_blank" rel="noopener noreferrer" {...rest}>
        {children}
      </MUILink>
    );
  }
  return (
    <MUILink href={href} {...rest}>
      {children}
    </MUILink>
  );
}
