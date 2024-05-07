/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import {
  FormGroup,
  FormGroupProps,
  Grid,
  Stack,
  StackProps,
} from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2';
import LayoutProp from '../../types/LayoutProp';
import ComponentSize from '../../types/ComponentSize';
import {
  Grid2ContainerProps,
  Grid2ItemProps,
  GridContainerProps,
  GridItemProps,
} from '../../types/GridProps';
import GridWrapper from './GridWrapper';
import Grid2Wrapper from './Grid2Wrapper';

/**
 * Props for the `Wrapper` component.
 * @alpha
 */
export interface WrapperProps {
  layout?: LayoutProp;
  formGroupProps?: Partial<FormGroupProps>;
  gridContainerProps?: GridContainerProps;
  gridItemProps?: GridItemProps;
  gridSelectorProps?: GridItemProps;
  gridInputProps?: GridItemProps;
  gridErrorProps?: GridItemProps;
  grid2ContainerProps?: Grid2ContainerProps;
  grid2ItemProps?: Grid2ItemProps;
  grid2SelectorProps?: Grid2ItemProps;
  grid2InputProps?: Grid2ItemProps;
  grid2ErrorProps?: Grid2ItemProps;
  stackProps?: Partial<StackProps>;
  selectorSize?: ComponentSize;
  inputSize?: ComponentSize;
  errorSize?: ComponentSize;
  children: ReactNode;
}

/**
 * Wraps the combined country code selector's subcomponents into MUI's `Grid`,
 * `Grid2` or `FormGroup` components according to the `layout` prop's value.
 * @alpha
 */
export default function Wrapper({
  layout = undefined,
  formGroupProps = undefined,
  gridContainerProps = undefined,
  gridItemProps = undefined,
  gridSelectorProps = undefined,
  gridInputProps = undefined,
  gridErrorProps = undefined,
  grid2ContainerProps = undefined,
  grid2ItemProps = undefined,
  grid2SelectorProps = undefined,
  grid2InputProps = undefined,
  grid2ErrorProps = undefined,
  stackProps = undefined,
  selectorSize = { xs: 4 },
  inputSize = { xs: 8 },
  errorSize = { xs: 12 },
  children,
}: WrapperProps) {
  switch (layout) {
    case 'grid':
      return (
        <Grid container {...gridContainerProps}>
          <GridWrapper
            gridItemProps={gridItemProps}
            gridSelectorProps={gridSelectorProps}
            gridInputProps={gridInputProps}
            gridErrorProps={gridErrorProps}
            selectorSize={selectorSize}
            inputSize={inputSize}
            errorSize={errorSize}
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
          gridErrorProps={gridErrorProps}
          selectorSize={selectorSize}
          inputSize={inputSize}
          errorSize={errorSize}
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
            grid2ErrorProps={grid2ErrorProps}
            selectorSize={selectorSize}
            inputSize={inputSize}
            errorSize={errorSize}
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
          grid2ErrorProps={grid2ErrorProps}
          selectorSize={selectorSize}
          inputSize={inputSize}
          errorSize={errorSize}
        >
          {children}
        </Grid2Wrapper>
      );
    case 'stack':
      return <Stack {...stackProps}>{children}</Stack>;
    case 'group':
      return <FormGroup {...formGroupProps}>{children}</FormGroup>;
    case 'row':
      return (
        <FormGroup row {...formGroupProps}>
          {children}
        </FormGroup>
      );
    default:
      return <>{children}</>; // eslint-disable-line react/jsx-no-useless-fragment
  }
}

export { GridWrapper };
export { Grid2Wrapper };
export type { Grid2WrapperProps } from './Grid2Wrapper';
export type { GridWrapperProps } from './GridWrapper';
