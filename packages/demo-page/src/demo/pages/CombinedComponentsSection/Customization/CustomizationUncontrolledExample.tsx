/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useCallback, useRef, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Button,
  AutocompleteRenderInputParams,
  TextField,
} from '@mui/material';
import { matchSorter } from 'match-sorter';
import {
  CountryCodeSelectorCombined,
  CountryType,
} from 'mui-country-code-selector';

export default function CustomizationUncontrolledExample() {
  const homePhoneNumRef = useRef<HTMLInputElement | null>(null);
  const [result, setResult] = useState('');
  const countryRef = useRef<CountryType | null>(null);
  const selectedCountryRef = useRef<CountryType | null>(null);

  const homePhoneOnChange = useCallback((e: { target: { value: string } }) => {
    const { value } = e.target;
    if (value && countryRef.current?.country) {
      selectedCountryRef.current = { ...countryRef.current };
    } else {
      selectedCountryRef.current = null;
    }
  }, []);

  const renderInput = (params: AutocompleteRenderInputParams) => {
    const adornmentOption = selectedCountryRef.current;
    let startAdornment = null;
    if (adornmentOption) {
      startAdornment = (
        <Box
          component="div"
          sx={{ '& > img': { mr: 2, mt: 1, ml: 1, flexShrink: 0 } }}
        >
          <img
            loading="lazy"
            width="30"
            src={`https://flagcdn.com/${adornmentOption.iso.toLowerCase()}.svg`}
            alt=""
          />
        </Box>
      );
    }

    const { InputProps } = params;
    const InputPropsToUse = { ...InputProps, startAdornment };
    const paramsToUse = { ...params, InputProps: InputPropsToUse };

    return (
      <TextField
        {...paramsToUse}
        label="Country code"
        inputProps={{
          ...params.inputProps,
          autoComplete: 'new-password', // disable autocomplete and autofill
        }}
      />
    );
  };

  function getOptionLabel(option: CountryType) {
    countryRef.current = option;
    return `${option.country}`;
  }

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
          alt={`flag of ${option.country}`}
        />
        {option.country} {option.iso} +{option.code}
      </Box>
    );
  }

  const filterOptions = (
    options: CountryType[],
    { inputValue }: { inputValue: string; getOptionLabel: object }
  ) => {
    const inputVal = inputValue.startsWith('+')
      ? inputValue.substring(1)
      : inputValue;
    return matchSorter<CountryType>(options, inputVal, {
      keys: ['country', 'code', 'iso'],
    });
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(`Phone, home: ${homePhoneNumRef.current?.value}`);
          setTimeout(() => {
            setResult('');
          }, 6000);
        }}
      >
        <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
          <CountryCodeSelectorCombined
            inputRef={homePhoneNumRef}
            phoneNumberLabel="Home phone number"
            onChange={homePhoneOnChange}
            layout="gridItems"
            selectorProps={{
              renderInput,
              getOptionLabel,
              renderOption,
              filterOptions,
              slotProps: { paper: { sx: { width: 300 } } },
            }}
          />
          <Grid item xs={12}>
            <Grid container direction="row" columnSpacing={{ xs: 1 }}>
              <Grid item>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid item>
                <Button variant="contained" type="reset">
                  Clear
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </form>
      {result && (
        <Typography align="left" variant="body2" style={{ marginTop: '1rem' }}>
          Result: {result}
        </Typography>
      )}
    </Box>
  );
}