/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import { Link as MUILink, LinkProps as MUILinkProps } from '@mui/material';

interface LinkProps extends MUILinkProps {
  children: ReactNode;
  newTab?: boolean;
}

const commonProps: MUILinkProps = {
  color: 'rgb(0, 117, 226)',
  sx: { '&:hover': { color: 'rgb(255, 0, 149)' } },
};

export default function Link({
  href,
  children,
  newTab = false,
  ...rest
}: LinkProps) {
  if (newTab) {
    return (
      <MUILink
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        {...commonProps}
        {...rest}
      >
        {children}
      </MUILink>
    );
  }
  return (
    <MUILink href={href} {...commonProps} {...rest}>
      {children}
    </MUILink>
  );
}
