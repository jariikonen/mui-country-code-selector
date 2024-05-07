import { GridSize } from '@mui/material';

/**
 * Represents a value for the composite component props that change the size of
 * country code selector subcomponents in a MUI Grid (or Grid2).
 * @alpha
 */
interface ComponentSize {
  xs?: boolean | GridSize;
  sm?: boolean | GridSize;
  md?: boolean | GridSize;
  lg?: boolean | GridSize;
  xl?: boolean | GridSize;
}

export default ComponentSize;
