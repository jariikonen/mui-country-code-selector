import { Breakpoint, GridSize } from '@mui/material';

type ResponsiveStyleValue<T> =
  | T
  | Array<T | null>
  | { [key in Breakpoint]?: T | null };

/**
 * Represents a value for the composite component props that change the size of
 * country code selector's subcomponents in a MUI `Grid`.
 * @alpha
 */
interface ComponentSizeGrid {
  size: ResponsiveStyleValue<GridSize>;
}

/**
 * Represents a value for the composite component props that change the size of
 * country code selector's subcomponents in a MUI `Grid` (the legacy grid
 * component).
 * @alpha
 */
export interface ComponentSizeGridLegacy {
  xs?: number | false | 'auto';
  sm?: number | false | 'auto';
  md?: number | false | 'auto';
  lg?: number | false | 'auto';
  xl?: number | false | 'auto';
}

export default ComponentSizeGrid;
