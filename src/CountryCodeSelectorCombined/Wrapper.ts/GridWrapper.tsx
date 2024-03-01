/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import { Grid } from '@mui/material';
import ComponentSize from '../../types/ComponentSize';
import { GridItemProps } from '../../types/GridProps';

interface GridWrapperProps {
  gridItemProps: GridItemProps | undefined;
  gridSelectorProps: GridItemProps | undefined;
  gridInputProps: GridItemProps | undefined;
  selectorSize: ComponentSize | undefined;
  inputSize: ComponentSize | undefined;
  children: ReactNode;
}

/**
 * Wraps the combined country code selector's components into a Mui Grid
 * component.
 */
export default function GridWrapper({
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  selectorSize,
  inputSize,
  children,
}: GridWrapperProps) {
  const selectorPropsToApply = {
    ...gridItemProps,
    ...gridSelectorProps,
    ...selectorSize,
  };
  const inputPropsToApply = {
    ...gridItemProps,
    ...gridInputProps,
    ...inputSize,
  };
  return (
    <>
      {React.Children.map(children, (child, index) => {
        switch (index) {
          case 0:
            return (
              <Grid item key="selector" {...selectorPropsToApply}>
                {child}
              </Grid>
            );
          case 1:
            return (
              <Grid item key="input" {...inputPropsToApply}>
                {child}
              </Grid>
            );
          default:
            return null;
        }
      })}
    </>
  );
}
