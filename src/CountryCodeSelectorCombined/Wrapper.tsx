import { ReactNode } from 'react';
import { FormGroup } from '@mui/material';
import { GroupProp } from '../types/GroupProp';

interface WrapperProps {
  group?: GroupProp;
  children: ReactNode;
}

export default function Wrapper({ group = false, children }: WrapperProps) {
  if (group) {
    return (
      // eslint-disable-next-line react/jsx-no-useless-fragment
      <>
        {group === 'row' ? (
          <FormGroup row>{children}</FormGroup>
        ) : (
          <FormGroup>{children}</FormGroup>
        )}
      </>
    );
  }
  return <>{children}</>; // eslint-disable-line react/jsx-no-useless-fragment
}
