import { Box, Grid, GridLegacy } from '@mui/material';
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
        phoneNumberLabel="gridLegacy"
        layout="gridLegacy"
        gridLegacyContainerProps={{
          columnSpacing: { xs: 1 },
          rowSpacing: { xs: 1 },
          sx: { mb: { xs: 1 } },
        }}
      />
      <GridLegacy
        container
        columnSpacing={{ xs: 1 }}
        rowSpacing={{ xs: 1 }}
        sx={{ mb: { xs: 1 } }}
      >
        <CountryCodeSelectorComposite
          phoneNumberLabel="gridLegacyItems"
          layout="gridLegacyItems"
        />
      </GridLegacy>
      <CountryCodeSelectorComposite
        phoneNumberLabel="default stack (no wrap)"
        layout="stack"
        stackProps={{
          direction: 'row',
          spacing: { xs: 1 },
          mt: { xs: 1 },
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
