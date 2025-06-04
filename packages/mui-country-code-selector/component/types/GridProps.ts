import { Grid2Props, GridProps } from '@mui/material';

/**
 * Represents the props that can be passed to a MUI `Grid` container component
 * used for the layout of the subcomponents of composite country code selector
 * component.
 * @alpha
 */
export type GridContainerProps = Partial<
  Omit<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>
>;

/**
 * Represents the props that can be passed to a MUI `Grid` item components
 * used for the layout of the subcomponents of composite country code selector
 * component.
 * @alpha
 */
export type GridItemProps = Partial<
  Omit<GridProps, 'spacing' | 'rowSpacing' | 'columnSpacing'>
>;

/**
 * Represents the props that can be passed to a MUI `Grid2` container component
 * used for the layout of the subcomponents of composite country code selector
 * component.
 * @alpha
 */
export type Grid2ContainerProps = Partial<Omit<Grid2Props, 'size' | 'offset'>>;

/**
 * Represents the props that can be passed to a MUI `Grid2` item components
 * used for the layout of the subcomponents of composite country code selector
 * component.
 * @alpha
 */
export type Grid2ItemProps = Partial<
  Omit<Grid2Props, 'spacing' | 'rowSpacing' | 'columnSpacing'>
>;
