import { Box, Grid } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { CountryCodeSelectorComposite } from 'mui-country-code-selector';

export default function LayoutWrappersExample() {
  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <CountryCodeSelectorComposite
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
        <CountryCodeSelectorComposite
          phoneNumberLabel="gridItems"
          layout="gridItems"
        />
      </Grid>
      <CountryCodeSelectorComposite
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
        <CountryCodeSelectorComposite
          phoneNumberLabel="grid2Items"
          layout="grid2Items"
        />
      </Grid2>
      <CountryCodeSelectorComposite
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
      <CountryCodeSelectorComposite
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
      <CountryCodeSelectorComposite
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
      <CountryCodeSelectorComposite
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
        <CountryCodeSelectorComposite
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
