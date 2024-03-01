/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import { FormGroup, FormGroupProps, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import GroupProp from '../../types/GroupProp';
import ComponentSize from '../../types/ComponentSize';
import {
  Grid2ContainerProps,
  Grid2ItemProps,
  GridContainerProps,
  GridItemProps,
} from '../../types/GridProps';
import GridWrapper from './GridWrapper';
import Grid2Wrapper from './Grid2Wrapper';

interface WrapperProps {
  group?: GroupProp;
  formGroupProps?: Partial<FormGroupProps>;
  gridContainerProps?: GridContainerProps;
  gridItemProps?: GridItemProps;
  gridSelectorProps?: GridItemProps;
  gridInputProps?: GridItemProps;
  grid2ContainerProps?: Grid2ContainerProps;
  grid2ItemProps?: Grid2ItemProps;
  grid2SelectorProps?: Grid2ItemProps;
  grid2InputProps?: Grid2ItemProps;
  selectorSize?: ComponentSize;
  inputSize?: ComponentSize;
  children: ReactNode;
}

/**
 * Wraps the combined country code selector's components into Mui Grid, Grid2
 * or FormGroup components according to the grid prop's value.
 */
export default function Wrapper({
  group = false,
  formGroupProps = undefined,
  gridContainerProps = undefined,
  gridItemProps = undefined,
  gridSelectorProps = undefined,
  gridInputProps = undefined,
  grid2ContainerProps = undefined,
  grid2ItemProps = undefined,
  grid2SelectorProps = undefined,
  grid2InputProps = undefined,
  selectorSize = undefined,
  inputSize = undefined,
  children,
}: WrapperProps) {
  switch (group) {
    case 'grid':
      return (
        <Grid container {...gridContainerProps}>
          <GridWrapper
            gridItemProps={gridItemProps}
            gridSelectorProps={gridSelectorProps}
            gridInputProps={gridInputProps}
            selectorSize={selectorSize}
            inputSize={inputSize}
          >
            {children}
          </GridWrapper>
        </Grid>
      );
    case 'gridItems':
      return (
        <GridWrapper
          gridItemProps={gridItemProps}
          gridSelectorProps={gridSelectorProps}
          gridInputProps={gridInputProps}
          selectorSize={selectorSize}
          inputSize={inputSize}
        >
          {children}
        </GridWrapper>
      );
    case 'grid2':
      return (
        <Grid2 container {...grid2ContainerProps}>
          <Grid2Wrapper
            grid2ItemProps={grid2ItemProps}
            grid2SelectorProps={grid2SelectorProps}
            grid2InputProps={grid2InputProps}
            selectorSize={selectorSize}
            inputSize={inputSize}
          >
            {children}
          </Grid2Wrapper>
        </Grid2>
      );
    case 'grid2Items':
      return (
        <Grid2Wrapper
          grid2ItemProps={grid2ItemProps}
          grid2SelectorProps={grid2SelectorProps}
          grid2InputProps={grid2InputProps}
          selectorSize={selectorSize}
          inputSize={inputSize}
        >
          {children}
        </Grid2Wrapper>
      );
    case 'row':
      return (
        <FormGroup row {...formGroupProps}>
          {children}
        </FormGroup>
      );
    default:
      if (typeof group === 'boolean' && group) {
        return <FormGroup {...formGroupProps}>{children}</FormGroup>;
      }
      return <>{children}</>; // eslint-disable-line react/jsx-no-useless-fragment
  }
}
