/* eslint-disable @typescript-eslint/prefer-nullish-coalescing */
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
  CountryCodeSelectorComposite,
  CountryType,
} from 'mui-country-code-selector';

export default function CustomizationExample() {
  const [phoneNumValue, setPhoneNumValue] = useState('');
  const [result, setResult] = useState('');
  const countryRef = useRef<CountryType | null>(null);
  const selectedCountryRef = useRef<CountryType | null>(null);

  const phoneOnChange = useCallback((e: { target: { value: string } }) => {
    const { value } = e.target;
    setPhoneNumValue(value);
    if (value && countryRef.current?.country) {
      selectedCountryRef.current = { ...countryRef.current };
    } else {
      selectedCountryRef.current = null;
      countryRef.current = null;
    }
  }, []);

  const clearForm = useCallback(() => {
    setPhoneNumValue('');
    setResult('');
  }, []);

  const renderInput = (params: AutocompleteRenderInputParams) => {
    const adornmentOption = selectedCountryRef.current;
    let startAdornment = null;
    if (adornmentOption) {
      const flagIso =
        adornmentOption.iso.length > 2
          ? adornmentOption.iso.slice(0, 2).toLowerCase()
          : adornmentOption.iso.toLowerCase();
      startAdornment = (
        <Box
          component="div"
          sx={{ '& > img': { mr: 2, mt: 1, ml: 1, flexShrink: 0 } }}
        >
          <img
            loading="lazy"
            width="30"
            src={`https://flagcdn.com/${flagIso}.svg`}
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
    const breakpoint = 600;

    const displayIso = option.displayIso
      ? ` ${option.displayIso}`
      : ` ${option.iso}`;

    let countryShort = '';
    let countryAdditional = '';
    if (Array.isArray(option.country)) {
      [countryShort, countryAdditional] = option.country;
      if (countryAdditional) {
        countryAdditional = ` (${countryAdditional})`;
      }
    } else {
      countryShort = option.country;
    }

    countryRef.current = option;

    if (window.innerWidth < breakpoint) {
      return displayIso.trim();
    }
    return `${countryShort}${countryAdditional}${displayIso}`;
  }

  function renderOption(
    props: React.HTMLAttributes<HTMLLIElement>,
    option: CountryType
  ) {
    const flagIso =
      option.iso.length > 2
        ? option.iso.slice(0, 2).toLowerCase()
        : option.iso.toLowerCase();
    const displayIso = option.displayIso ? option.displayIso : option.iso;

    let countryShort = '';
    let countryAdditional = '';
    if (Array.isArray(option.country)) {
      [countryShort, countryAdditional] = option.country;
      if (countryAdditional) {
        countryAdditional = ` (${countryAdditional})`;
      }
    } else {
      countryShort = option.country;
    }

    return (
      <Box
        component="li"
        sx={{ '& > img': { mr: 2, flexShrink: 0 } }}
        {...props}
      >
        <img
          loading="lazy"
          width="30"
          src={`https://flagcdn.com/${flagIso}.svg`}
          alt={`flag of ${countryShort}`}
        />
        {countryShort}
        {countryAdditional} {displayIso} +{option.code}
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
      keys: [
        { threshold: matchSorter.rankings.WORD_STARTS_WITH, key: 'country' },
        'code',
        'iso',
      ],
    });
  };

  return (
    <Box sx={{ flexGrow: 1, maxWidth: '600px' }}>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(`Phone, home: ${phoneNumValue}`);
          setTimeout(() => {
            setResult('');
          }, 6000);
        }}
      >
        <Grid container columnSpacing={{ xs: 1 }} rowSpacing={{ xs: 1 }}>
          <CountryCodeSelectorComposite
            value={phoneNumValue}
            onChange={phoneOnChange}
            layout="gridItems"
            selectorProps={{
              renderInput,
              getOptionLabel,
              renderOption,
              filterOptions,
              slotProps: { paper: { sx: { width: 300 } } },
            }}
          />
          <Grid size={{ xs: 12 }}>
            <Grid container direction="row" columnSpacing={{ xs: 1 }}>
              <Grid>
                <Button variant="contained" type="submit">
                  Submit
                </Button>
              </Grid>
              <Grid>
                <Button variant="contained" type="button" onClick={clearForm}>
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
