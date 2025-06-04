/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import {
  FormGroup,
  FormGroupProps,
  Grid,
  Stack,
  StackProps,
} from '@mui/material';
import Grid2 from '@mui/material/Grid2';
import LayoutProp from '../../types/LayoutProp';
import ComponentSize, {
  ComponentSizeLegacyGrid,
} from '../../types/ComponentSize';
import {
  Grid2ContainerProps,
  Grid2ItemProps,
  GridContainerProps,
  GridItemProps,
} from '../../types/GridProps';
import GridWrapper from './GridWrapper';
import Grid2Wrapper from './Grid2Wrapper';

const DEFAULT_SELECTOR_SIZE = { xs: 4 };
const DEFAULT_INPUT_SIZE = { xs: 8 };
const DEFAULT_ERROR_SIZE = { xs: 12 };

function isComponenSizeLegacyGrid(
  size: ComponentSize | ComponentSizeLegacyGrid
): size is ComponentSizeLegacyGrid {
  if (size && Object.keys(size).includes('grow')) {
    return false;
  }
  return true;
}

function parseComponentSizeLegacyGrid(
  size: ComponentSize | ComponentSizeLegacyGrid
): ComponentSizeLegacyGrid {
  if (!size || !isComponenSizeLegacyGrid(size)) {
    throw new Error('Legacy Grid component\'s size cannot be "grow".');
  }
  return size;
}

function isComponentSizeGrid2(
  size: ComponentSize | ComponentSizeLegacyGrid
): size is ComponentSize {
  if (size && Object.keys(size).includes('size')) {
    return true;
  }
  return false;
}

function parseComponentSizeGrid2(
  size: ComponentSize | ComponentSizeLegacyGrid
): ComponentSize {
  if (!size || !isComponentSizeGrid2(size)) {
    throw new Error(
      'The size of Grid2 components must be set using the "size" prop.'
    );
  }
  return size;
}

/**
 * Props for the `Wrapper` component.
 * @internal
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
  selectorSize?: ComponentSize | ComponentSizeLegacyGrid;
  inputSize?: ComponentSize | ComponentSizeLegacyGrid;
  errorSize?: ComponentSize | ComponentSizeLegacyGrid;
  children: ReactNode;
}

/**
 * Wraps the composite country code selector's subcomponents into MUI's `Grid`,
 * `Grid2` or `FormGroup` components according to the `layout` prop's value.
 * @internal
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
  selectorSize = undefined,
  inputSize = undefined,
  errorSize = undefined,
  children,
}: WrapperProps) {
  const legacySelectorSize = selectorSize
    ? parseComponentSizeLegacyGrid(selectorSize)
    : DEFAULT_SELECTOR_SIZE;
  const legacyInputSize = inputSize
    ? parseComponentSizeLegacyGrid(inputSize)
    : DEFAULT_INPUT_SIZE;
  const legacyErrorSize = errorSize
    ? parseComponentSizeLegacyGrid(errorSize)
    : DEFAULT_ERROR_SIZE;
  const grid2SelectorSize = selectorSize
    ? parseComponentSizeGrid2(selectorSize)
    : { size: DEFAULT_SELECTOR_SIZE };
  const grid2InputSize = inputSize
    ? parseComponentSizeGrid2(inputSize)
    : { size: DEFAULT_INPUT_SIZE };
  const grid2ErrorSize = errorSize
    ? parseComponentSizeGrid2(errorSize)
    : { size: DEFAULT_ERROR_SIZE };
  switch (layout) {
    case 'grid':
      return (
        <Grid container {...gridContainerProps}>
          <GridWrapper
            gridItemProps={gridItemProps}
            gridSelectorProps={gridSelectorProps}
            gridInputProps={gridInputProps}
            gridErrorProps={gridErrorProps}
            selectorSize={legacySelectorSize}
            inputSize={legacyInputSize}
            errorSize={legacyErrorSize}
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
          selectorSize={legacySelectorSize}
          inputSize={legacyInputSize}
          errorSize={legacyErrorSize}
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
            selectorSize={grid2SelectorSize}
            inputSize={grid2InputSize}
            errorSize={grid2ErrorSize}
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
          selectorSize={grid2SelectorSize}
          inputSize={grid2InputSize}
          errorSize={grid2ErrorSize}
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
