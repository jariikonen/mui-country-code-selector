/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import Grid from '@mui/material/Grid';
import ComponentSize from '../../types/ComponentSize';
import { GridItemProps } from '../../types/GridProps';

/**
 * Represents the props of the `GridWrapper` component.
 * @internal
 */
export interface GridWrapperProps {
  gridItemProps: GridItemProps | undefined;
  gridSelectorProps: GridItemProps | undefined;
  gridInputProps: GridItemProps | undefined;
  gridErrorProps: GridItemProps | undefined;
  selectorSize: ComponentSize | undefined;
  inputSize: ComponentSize | undefined;
  errorSize: ComponentSize | undefined;
  children: ReactNode;
}

/**
 * Wraps the combined country code selector's subcomponents into MUI `Grid`
 * components.
 * @internal
 */
export default function GridWrapper({
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  gridErrorProps,
  selectorSize,
  inputSize,
  errorSize,
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
  const errorPropsToApply = {
    ...gridItemProps,
    ...gridErrorProps,
    ...errorSize,
  };
  return (
    <>
      {React.Children.map(children, (child, index) => {
        switch (index) {
          case 0:
            return (
              <Grid key="selector" {...selectorPropsToApply}>
                {child}
              </Grid>
            );
          case 1:
            return (
              <Grid key="input" {...inputPropsToApply}>
                {child}
              </Grid>
            );
          case 2:
            return child !== null ? (
              <Grid key="error" {...errorPropsToApply}>
                {child}
              </Grid>
            ) : null;
          default:
            return null;
        }
      })}
    </>
  );
}
