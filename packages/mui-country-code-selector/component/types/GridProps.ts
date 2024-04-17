import { Grid2Props, GridProps } from '@mui/material';

export type GridContainerProps = Partial<
  Omit<GridProps, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>
>;

export type GridItemProps = Partial<
  Omit<GridProps, 'spacing' | 'rowSpacing' | 'columnSpacing'>
>;

export type Grid2ContainerProps = Partial<
  Omit<Grid2Props, 'xs' | 'sm' | 'md' | 'lg' | 'xl'>
>;

export type Grid2ItemProps = Partial<
  Omit<Grid2Props, 'spacing' | 'rowSpacing' | 'columnSpacing'>
>;
