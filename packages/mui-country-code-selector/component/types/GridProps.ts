import { GridLegacyProps, GridProps } from '@mui/material';

/**
 * Represents the props that can be passed to a MUI `Grid` container component
 * used for the layout of the subcomponents of composite country code selector
 * component.
 * @alpha
 */
export type GridLegacyContainerProps = Partial<GridLegacyProps>;

/**
 * Represents the props that can be passed to a MUI `Grid` item components
 * used for the layout of the subcomponents of composite country code selector
 * component.
 * @alpha
 */
export type GridLegacyItemProps = Partial<
  Omit<GridLegacyProps, 'spacing' | 'rowSpacing' | 'columnSpacing'>
>;

/**
 * Represents the props that can be passed to a MUI `Grid2` container component
 * used for the layout of the subcomponents of composite country code selector
 * component.
 * @alpha
 */
export type GridContainerProps = Partial<Omit<GridProps, 'size' | 'offset'>>;

/**
 * Represents the props that can be passed to a MUI `Grid2` item components
 * used for the layout of the subcomponents of composite country code selector
 * component.
 * @alpha
 */
export type GridItemProps = Partial<
  Omit<GridProps, 'spacing' | 'rowSpacing' | 'columnSpacing'>
>;
