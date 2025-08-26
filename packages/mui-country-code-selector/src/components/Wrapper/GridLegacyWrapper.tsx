/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactNode } from 'react';
import { GridLegacy } from '@mui/material';
import { ComponentSizeGridLegacy } from '../../types/ComponentSize';
import { GridLegacyItemProps } from '../../types/GridProps';

/**
 * Represents the props of the `GridLegacyWrapper` component.
 * @internal
 */
export interface GridLegacyWrapperProps {
  gridItemProps: GridLegacyItemProps | undefined;
  gridSelectorProps: GridLegacyItemProps | undefined;
  gridInputProps: GridLegacyItemProps | undefined;
  gridErrorProps: GridLegacyItemProps | undefined;
  selectorSize: ComponentSizeGridLegacy | undefined;
  inputSize: ComponentSizeGridLegacy | undefined;
  errorSize: ComponentSizeGridLegacy | undefined;
  children: ReactNode;
}

/**
 * Wraps the composite country code selector's subcomponents into MUI
 * `GridLegacy` and `GridLegacy item`components.
 * @internal
 */
export default function GridLegacyWrapper({
  gridItemProps,
  gridSelectorProps,
  gridInputProps,
  gridErrorProps,
  selectorSize,
  inputSize,
  errorSize,
  children,
}: GridLegacyWrapperProps) {
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
              <GridLegacy item key="selector" {...selectorPropsToApply}>
                {child}
              </GridLegacy>
            );
          case 1:
            return (
              <GridLegacy item key="input" {...inputPropsToApply}>
                {child}
              </GridLegacy>
            );
          case 2:
            return child !== null ? (
              <GridLegacy item key="error" {...errorPropsToApply}>
                {child}
              </GridLegacy>
            ) : null;
          default:
            return null;
        }
      })}
    </>
  );
}
