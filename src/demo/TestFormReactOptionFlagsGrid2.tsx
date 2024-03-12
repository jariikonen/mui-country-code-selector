/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useEffect, useRef, useState } from 'react';
import { Box, Typography, TextField, FormGroup, Button } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombined/CountryCodeSelectorCombinedReact';
import { CountryType } from '../lib/countryCodeData';

function TestForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [homePhoneNumValue, setHomePhoneNumValue] = useState('+358 ');
  const [workPhoneNumValue, setWorkPhoneNumValue] = useState('');
  const [result, setResult] = useState('');

  const homePhoneOnChange = useCallback(
    (e: { target: { value: string } }) => setHomePhoneNumValue(e.target.value),
    []
  );

  const workPhoneOnChange = useCallback(
    (e: { target: { value: string } }) => setWorkPhoneNumValue(e.target.value),
    []
  );

  const numOfRenders = useRef(0);

  useEffect(() => {
    if (numOfRenders.current !== undefined) {
      numOfRenders.current += 1;
    }
  });

  function renderOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: CountryType
  ) {
    return (
      <Box
        component="li"
        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        {...props}
      >
        <img
          loading="lazy"
          width="30"
          src={`https://flagcdn.com/${option.iso.toLowerCase()}.svg`}
          alt=""
        />
        {option.country} {option.iso} +{option.code}
      </Box>
    );
  }

  function getOptionLabel(option: CountryType) {
    return `${option.country}`;
  }

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Test form with a combined country code selector and phone number input
        component (React)
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(
            `First name: ${firstName}, Last name: ${lastName}, ` +
              `Phone, home: ${homePhoneNumValue}, ` +
              `Phone, work: ${workPhoneNumValue}`
          );
        }}
      >
        <Grid container columnSpacing={1} rowSpacing={{ xs: 1 }}>
          <Grid xs={6}>
            <TextField
              type="text"
              label="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              fullWidth
            />
          </Grid>
          <Grid xs={6}>
            <TextField
              type="text"
              label="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              fullWidth
            />
          </Grid>
          <CountryCodeSelectorCombined
            value={homePhoneNumValue}
            onChange={homePhoneOnChange}
            countryCodeLabel="Code"
            group="grid2Items"
            grid2ContainerProps={{ columns: 9, spacing: 1 }}
            selectorSize={{ xs: 3 }}
            inputSize={{ xs: 6 }}
            selectorProps={{
              renderOption,
              getOptionLabel,
              componentsProps: { paper: { sx: { width: 300 } } },
            }}
            gridErrorProps={{ xs: 5, classes: { root: 'testi' } }}
            errorSize={{ xs: 3 }}
            errorProps={{ error: false }}
          />
          <Grid xs={12}>
            <CountryCodeSelectorCombined
              value={workPhoneNumValue}
              countryCodeLabel="Country code"
              phoneNumberLabel="Work phone number"
              onChange={workPhoneOnChange}
              group="row"
              selectorProps={{
                renderOption,
                sx: {
                  width: 1 / 3,
                  paddingRight: 0.5,
                  boxSizing: 'border-box',
                  WebkitBoxSizing: 'border-box',
                },
              }}
              inputProps={{
                sx: {
                  width: 2 / 3,
                  paddingLeft: 0.5,
                  boxSizing: 'border-box',
                  WebkitBoxSizing: 'border-box',
                },
              }}
            />
          </Grid>
          <Grid xs={12}>
            <FormGroup row>
              <Button
                variant="contained"
                type="submit"
                sx={{
                  marginRight: '0.2rem',
                  boxSizing: 'border-box',
                  webkitBoxSizing: 'border-box',
                }}
              >
                Submit
              </Button>
              <Button
                variant="contained"
                type="button"
                sx={{
                  marginLeft: '0.2rem',
                  boxSizing: 'border-box',
                  webkitBoxSizing: 'border-box',
                }}
                onClick={() => {
                  setFirstName('');
                  setLastName('');
                  setHomePhoneNumValue('+358');
                  setWorkPhoneNumValue('');
                  setResult('');
                }}
              >
                Clear
              </Button>
            </FormGroup>
          </Grid>
        </Grid>
      </form>
      <Typography
        align="left"
        variant="body2"
        style={{
          marginTop: '0.5rem',
          marginBottom: '0.5rem',
          marginLeft: '0.1rem',
        }}
      >
        Form renders: {numOfRenders.current}
      </Typography>
      {result && (
        <Typography align="left" variant="body2" style={{ marginTop: '1rem' }}>
          Result: {result}
        </Typography>
      )}
    </Box>
  );
}

export default TestForm;
