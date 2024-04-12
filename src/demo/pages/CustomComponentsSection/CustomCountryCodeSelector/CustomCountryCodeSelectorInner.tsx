/* eslint-disable jsx-a11y/label-has-associated-control */
/* eslint-disable react/jsx-props-no-spreading */
import { useEffect } from 'react';
import { FormHelperText, AutocompleteRenderInputParams } from '@mui/material';
import CountryCodeSelector from '../../../../CountryCodeSelector';
import useCountryCodeStore from '../../../../store/useCountryCodeStore';

export interface CustomCountryCodeSelectorProps {
  value?: string;
  onChange?: (e: { target: { value: string } }) => void;
}

export default function CustomCountryCodeSelectorInner({
  value = undefined,
  onChange = undefined,
}: CustomCountryCodeSelectorProps) {
  const {
    phoneNumStr,
    errorMsg,
    setRefs,
    initialize,
    handlePhoneNumberChange,
    handleValueChange,
    placeInputSelection,
  } = useCountryCodeStore();

  const valueToUse = value ?? phoneNumStr;

  useEffect(() => initialize(3, undefined, onChange), [initialize, onChange]);

  useEffect(() => {
    handleValueChange(value);
  }, [handleValueChange, value]);

  useEffect(() => {
    placeInputSelection();
  });

  const renderInput = (params: AutocompleteRenderInputParams) => (
    <div className="CCContainer" ref={params.InputProps.ref}>
      <label>
        Country code:
        <input type="text" {...params.inputProps} />
      </label>
    </div>
  );

  return (
    <>
      <CountryCodeSelector renderInput={renderInput} />
      <div className="CCContainer">
        <label>
          Phone number:
          <input
            ref={setRefs}
            type="text"
            value={valueToUse}
            onChange={handlePhoneNumberChange}
          />
        </label>
      </div>
      {errorMsg && <FormHelperText error>{errorMsg}</FormHelperText>}
    </>
  );
}
