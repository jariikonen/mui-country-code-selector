/* eslint-disable react/jsx-props-no-spreading */
import { ReactNode } from 'react';
import {
  FormGroup,
  FormGroupProps,
  Grid,
  GridLegacy,
  Stack,
  StackProps,
} from '@mui/material';
import LayoutProp from '../../types/LayoutProp';
import ComponentSize, {
  ComponentSizeGridLegacy,
} from '../../types/ComponentSize';
import {
  GridContainerProps,
  GridItemProps,
  GridLegacyContainerProps,
  GridLegacyItemProps,
} from '../../types/GridProps';
import GridLegacyWrapper from './GridLegacyWrapper';
import GridWrapper from './GridWrapper';

const DEFAULT_SELECTOR_SIZE = { xs: 4 };
const DEFAULT_INPUT_SIZE = { xs: 8 };
const DEFAULT_ERROR_SIZE = { xs: 12 };

function isComponenSizeGridLegacy(
  size: ComponentSize | ComponentSizeGridLegacy
): size is ComponentSizeGridLegacy {
  if (size && Object.keys(size).includes('grow')) {
    return false;
  }
  return true;
}

function parseComponentSizeGridLegacy(
  size: ComponentSize | ComponentSizeGridLegacy
): ComponentSizeGridLegacy {
  if (!size || !isComponenSizeGridLegacy(size)) {
    throw new Error('Legacy Grid component\'s size cannot be "grow".');
  }
  return size;
}

function isComponentSizeGrid(
  size: ComponentSize | ComponentSizeGridLegacy
): size is ComponentSize {
  if (size && Object.keys(size).includes('size')) {
    return true;
  }
  return false;
}

function parseComponentSizeGrid(
  size: ComponentSize | ComponentSizeGridLegacy
): ComponentSize {
  if (!size || !isComponentSizeGrid(size)) {
    throw new Error(
      'The size of Grid components must be set using the "size" prop.'
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
  gridLegacyContainerProps?: GridLegacyContainerProps;
  gridLegacyItemProps?: GridLegacyItemProps;
  gridLegacySelectorProps?: GridLegacyItemProps;
  gridLegacyInputProps?: GridLegacyItemProps;
  gridLegacyErrorProps?: GridLegacyItemProps;
  gridContainerProps?: GridContainerProps;
  gridItemProps?: GridItemProps;
  gridSelectorProps?: GridItemProps;
  gridInputProps?: GridItemProps;
  gridErrorProps?: GridItemProps;
  stackProps?: Partial<StackProps>;
  selectorSize?: ComponentSize | ComponentSizeGridLegacy;
  inputSize?: ComponentSize | ComponentSizeGridLegacy;
  errorSize?: ComponentSize | ComponentSizeGridLegacy;
  children: ReactNode;
}

/**
 * Wraps the composite country code selector's subcomponents into MUI's `Grid`,
 * `GridLegacy` or `FormGroup` components according to the `layout` prop's
 * value.
 * @internal
 */
export default function Wrapper({
  layout = undefined,
  formGroupProps = undefined,
  gridLegacyContainerProps = undefined,
  gridLegacyItemProps = undefined,
  gridLegacySelectorProps = undefined,
  gridLegacyInputProps = undefined,
  gridLegacyErrorProps = undefined,
  gridContainerProps = undefined,
  gridItemProps = undefined,
  gridSelectorProps = undefined,
  gridInputProps = undefined,
  gridErrorProps = undefined,
  stackProps = undefined,
  selectorSize = undefined,
  inputSize = undefined,
  errorSize = undefined,
  children,
}: WrapperProps) {
  const legacySelectorSize = selectorSize
    ? parseComponentSizeGridLegacy(selectorSize)
    : DEFAULT_SELECTOR_SIZE;
  const legacyInputSize = inputSize
    ? parseComponentSizeGridLegacy(inputSize)
    : DEFAULT_INPUT_SIZE;
  const legacyErrorSize = errorSize
    ? parseComponentSizeGridLegacy(errorSize)
    : DEFAULT_ERROR_SIZE;
  const gridSelectorSize = selectorSize
    ? parseComponentSizeGrid(selectorSize)
    : { size: DEFAULT_SELECTOR_SIZE };
  const gridInputSize = inputSize
    ? parseComponentSizeGrid(inputSize)
    : { size: DEFAULT_INPUT_SIZE };
  const gridErrorSize = errorSize
    ? parseComponentSizeGrid(errorSize)
    : { size: DEFAULT_ERROR_SIZE };
  switch (layout) {
    case 'gridLegacy':
      return (
        <GridLegacy container {...gridLegacyContainerProps}>
          <GridLegacyWrapper
            gridItemProps={gridLegacyItemProps}
            gridSelectorProps={gridLegacySelectorProps}
            gridInputProps={gridLegacyInputProps}
            gridErrorProps={gridLegacyErrorProps}
            selectorSize={legacySelectorSize}
            inputSize={legacyInputSize}
            errorSize={legacyErrorSize}
          >
            {children}
          </GridLegacyWrapper>
        </GridLegacy>
      );
    case 'gridLegacyItems':
      return (
        <GridLegacyWrapper
          gridItemProps={gridLegacyItemProps}
          gridSelectorProps={gridLegacySelectorProps}
          gridInputProps={gridLegacyInputProps}
          gridErrorProps={gridLegacyErrorProps}
          selectorSize={legacySelectorSize}
          inputSize={legacyInputSize}
          errorSize={legacyErrorSize}
        >
          {children}
        </GridLegacyWrapper>
      );
    case 'grid':
      return (
        <Grid container {...gridContainerProps}>
          <GridWrapper
            gridItemProps={gridItemProps}
            gridSelectorProps={gridSelectorProps}
            gridInputProps={gridInputProps}
            gridErrorProps={gridErrorProps}
            selectorSize={gridSelectorSize}
            inputSize={gridInputSize}
            errorSize={gridErrorSize}
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
          selectorSize={gridSelectorSize}
          inputSize={gridInputSize}
          errorSize={gridErrorSize}
        >
          {children}
        </GridWrapper>
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

export { GridLegacyWrapper };
export { GridWrapper };
export type { GridWrapperProps } from './GridWrapper';
export type { GridLegacyWrapperProps } from './GridLegacyWrapper';
