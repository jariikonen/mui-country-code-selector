/* eslint-disable react/jsx-props-no-spreading */
import { Typography, TypographyProps } from '@mui/material';

const commonSx: TypographyProps['sx'] = {
  overflowWrap: 'break-word',
};

export function H1({ children, ...props }: TypographyProps) {
  return (
    <Typography
      variant="h3"
      align="center"
      sx={{ ...commonSx, mt: { xs: 6 }, mb: { xs: 4 } }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function H2({ children, ...props }: TypographyProps) {
  return (
    <Typography
      variant="h4"
      align="left"
      sx={{ ...commonSx, mt: { xs: 4 }, mb: { xs: 2 } }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function H3({ children, ...props }: TypographyProps) {
  return (
    <Typography
      variant="h5"
      align="left"
      sx={{ ...commonSx, mt: { xs: 4.5 }, mb: { xs: 2 } }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function H4({ children, ...props }: TypographyProps) {
  return (
    <Typography
      variant="h6"
      align="left"
      sx={{ ...commonSx, mt: { xs: 3 }, mb: { xs: 2 } }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function H5({ children, ...props }: TypographyProps) {
  return (
    <Typography
      variant="subtitle1"
      align="left"
      sx={{
        ...commonSx,
        fontStyle: 'italic',
        mt: { xs: 2.5 },
        mb: { xs: 1.5 },
      }}
      {...props}
    >
      {children}
    </Typography>
  );
}

export function P({ children, ...props }: TypographyProps) {
  return (
    <Typography
      variant="body1"
      sx={{ ...commonSx, mt: { xs: 1 }, mb: { xs: 2 } }}
      {...props}
    >
      {children}
    </Typography>
  );
}
