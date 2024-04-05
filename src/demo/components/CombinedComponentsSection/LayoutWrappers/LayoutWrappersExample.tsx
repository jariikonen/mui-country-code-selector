import { Box, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import CountryCodeSelectorCombined from '../../../../CountryCodeSelectorCombined';

export default function LayoutWrappersExample() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <CountryCodeSelectorCombined
        phoneNumberLabel="grid"
        layout="grid"
        gridContainerProps={{
          columnSpacing: { xs: 1 },
          rowSpacing: { xs: 1 },
          sx: { mb: { xs: 1 } },
        }}
      />
      <Grid
        container
        columnSpacing={{ xs: 1 }}
        rowSpacing={{ xs: 1 }}
        sx={{ mb: { xs: 1 } }}
      >
        <CountryCodeSelectorCombined
          phoneNumberLabel="gridItems"
          layout="gridItems"
        />
      </Grid>
      <CountryCodeSelectorCombined
        phoneNumberLabel="grid2"
        layout="grid2"
        grid2ContainerProps={{
          columnSpacing: { xs: 1 },
          rowSpacing: { xs: 1 },
          sx: { mb: { xs: 0.5 } },
        }}
      />
      <Grid2
        container
        columnSpacing={{ xs: 1 }}
        rowSpacing={{ xs: 1 }}
        sx={{ mb: { xs: 0.5 } }}
      >
        <CountryCodeSelectorCombined
          phoneNumberLabel="grid2Items"
          layout="grid2Items"
        />
      </Grid2>
      <CountryCodeSelectorCombined
        phoneNumberLabel="default stack (no wrap)"
        layout="stack"
        stackProps={{
          direction: 'row',
          spacing: { xs: 1 },
          mt: { xs: 0.5 },
          mb: { xs: 1 },
        }}
        selectorProps={{
          sx: {
            width: 1 / 3 - 0.01,
          },
        }}
        inputProps={{
          sx: {
            width: 2 / 3 - 0.01,
          },
        }}
      />
      <CountryCodeSelectorCombined
        phoneNumberLabel="stack with flexbox gap and wrap"
        layout="stack"
        stackProps={{
          direction: 'row',
          useFlexGap: true,
          flexWrap: 'wrap',
          spacing: { xs: 1 },
          mt: { xs: 0.5 },
          mb: { xs: 1 },
        }}
        selectorProps={{
          sx: {
            width: 1 / 3 - 0.01,
          },
        }}
        inputProps={{
          sx: {
            width: 2 / 3 - 0.01,
          },
        }}
      />
      <CountryCodeSelectorCombined
        phoneNumberLabel="group"
        layout="group"
        formGroupProps={{ row: true, sx: { mt: { xs: 0.5 }, mb: { xs: 1 } } }}
        selectorProps={{
          sx: {
            width: 1 / 3,
            pr: 0.5,
          },
        }}
        inputProps={{
          sx: {
            width: 2 / 3,
            pl: 0.5,
          },
        }}
      />
      <CountryCodeSelectorCombined
        phoneNumberLabel="row"
        layout="row"
        formGroupProps={{ sx: { mt: { xs: 0.5 }, mb: { xs: 1 } } }}
        selectorProps={{
          sx: {
            width: 1 / 3,
            pr: 0.5,
          },
        }}
        inputProps={{
          sx: {
            width: 2 / 3,
            pl: 0.5,
          },
        }}
      />
      <Box sx={{ mt: { xs: 0.5 }, mb: { xs: 1 } }}>
        <CountryCodeSelectorCombined
          phoneNumberLabel="default"
          selectorProps={{
            sx: {
              width: 1 / 3 - 0.01,
            },
          }}
          inputProps={{
            sx: {
              width: 2 / 3 - 0.01,
            },
          }}
        />
      </Box>
    </Box>
  );
}
