/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import ComponentSize from '../../types/ComponentSize';
import { Grid2ItemProps } from '../../types/GridProps';

interface GridWrapperProps {
  grid2ItemProps: Grid2ItemProps | undefined;
  grid2SelectorProps: Grid2ItemProps | undefined;
  grid2InputProps: Grid2ItemProps | undefined;
  selectorSize: ComponentSize | undefined;
  inputSize: ComponentSize | undefined;
  children: ReactNode;
}

/**
 * Wraps the combined country code selector's components into a Mui Grid2
 * component.
 */
export default function GridWrapper({
  grid2ItemProps,
  grid2SelectorProps,
  grid2InputProps,
  selectorSize,
  inputSize,
  children,
}: GridWrapperProps) {
  const selectorPropsToApply = {
    ...grid2ItemProps,
    ...grid2SelectorProps,
    ...selectorSize,
  };
  const inputPropsToApply = {
    ...grid2ItemProps,
    ...grid2InputProps,
    ...inputSize,
  };
  return (
    <>
      {React.Children.map(children, (child, index) => {
        switch (index) {
          case 0:
            return (
              <Grid2 key="selector" {...selectorPropsToApply}>
                {child}
              </Grid2>
            );
          case 1:
            return (
              <Grid2 key="input" {...inputPropsToApply}>
                {child}
              </Grid2>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
