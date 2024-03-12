import { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  TextField,
  FormGroup,
  FormHelperText,
  Button,
} from '@mui/material';
import CountryCodeSelector from '../CountryCodeSelector/CountryCodeSelectorZustand';
import useCountryCodeStore from '../store/useCountryCodeStore';

function DemoForm() {
  const {
    initialize,
    phoneNumStr,
    errorMsg,
    handlePhoneNumberChange,
    placeInputSelection,
    setRefs,
  } = useCountryCodeStore();

  const [result, setResult] = useState<string | null>(null);

  useEffect(() => initialize(3, undefined), [initialize]);

  // Inputting a forbidden character into the phone number input makes the
  // cursor jump to the end of the field. This can be fixed by keeping track of
  // the cursor position (more specifically the end and start indices of the
  // selected text within the input element) in the state and setting those
  // values again on every render. The placeInputSelection() store-function
  // sets the selection range based on values stored in the store.
  useEffect(() => {
    placeInputSelection();
  });

  const onInputRefChange = useCallback(
    (element: HTMLInputElement | null) => {
      setRefs(element, undefined, '');
    },
    [setRefs]
  );

  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Phone number input and a country code selector combined using a Zustand
        store
      </Typography>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          setResult(phoneNumStr);
        }}
      >
        <Grid container rowSpacing={{ xs: 1 }} columnSpacing={{ xs: 0.7 }}>
          <Grid item xs={12}>
            <FormGroup row>
              <CountryCodeSelector
                label="Country code"
                sx={{
                  width: '35%',
                  paddingRight: '0.2rem',
                  boxSizing: 'border-box',
                  WebkitBoxSizing: 'border-box',
                }}
              />
              <TextField
                error={errorMsg !== null}
                label="Phone number"
                value={phoneNumStr}
                type="text"
                inputRef={onInputRefChange}
                sx={{
                  width: '65%',
                  paddingLeft: '0.2rem',
                  boxSizing: 'border-box',
                  webkitBoxSizing: 'border-box',
                }}
                onChange={handlePhoneNumberChange}
              />
              {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
            </FormGroup>
          </Grid>
          <Grid item xs={12}>
            <Button variant="contained" type="submit">
              Submit
            </Button>
          </Grid>
        </Grid>
      </form>
      {result && (
        <Typography align="left" variant="body2" style={{ marginTop: '1rem' }}>
          Phone number: {result}
        </Typography>
      )}
    </Box>
  );
}

export default DemoForm;
