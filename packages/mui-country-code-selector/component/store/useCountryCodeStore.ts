import { useContext } from 'react';
import { useStoreWithEqualityFn } from 'zustand/traditional';
import { shallow } from 'zustand/shallow';
import CountryCodeStoreContext from './CountryCodeStoreContext';
import CCSelectorState from '../types/CCSelectorState';

/**
 * A custom hook that returns a country code store. Store is fetched from a
 * React context and therefore the component using this hook is expected to be
 * surrounded by `CountryCodeStoreProvider` tags.
 * @alpha
 */
const useCountryCodeStore = (): Pick<
  CCSelectorState,
  | 'phoneNumStr'
  | 'countryCodeValue'
  | 'countries'
  | 'errorMsg'
  | 'errorMsgDelay'
  | 'errorMsgTimeoutObj'
  | 'phoneNumberInput'
  | 'clearedRerender'
  | 'setPhoneNumberInput'
  | 'setRefs'
  | 'initialize'
  | 'cleanUp'
  | 'handlePhoneNumberChange'
  | 'handleCountryCodeChange'
  | 'handleValueChange'
  | 'placeInputSelection'
> => {
  const store = useContext(CountryCodeStoreContext);
  if (store === null) {
    throw new Error(
      'no provider - please, surround the component with CountryCodeStoreProvider tags'
    );
  }
  // use shallow equality function to optimize rerenders
  return {
    phoneNumStr: useStoreWithEqualityFn(
      store,
      (state) => state.phoneNumStr,
      shallow
    ),
    countryCodeValue: useStoreWithEqualityFn(
      store,
      (state) => state.countryCodeValue,
      shallow
    ),
    countries: useStoreWithEqualityFn(
      store,
      (state) => state.countries,
      shallow
    ),
    errorMsg: useStoreWithEqualityFn(store, (state) => state.errorMsg, shallow),
    errorMsgDelay: useStoreWithEqualityFn(
      store,
      (state) => state.errorMsgDelay,
      shallow
    ),
    errorMsgTimeoutObj: useStoreWithEqualityFn(
      store,
      (state) => state.errorMsgTimeoutObj,
      shallow
    ),
    phoneNumberInput: useStoreWithEqualityFn(
      store,
      (state) => state.phoneNumberInput,
      shallow
    ),
    clearedRerender: useStoreWithEqualityFn(
      store,
      (state) => state.clearedRerender,
      shallow
    ),
    setPhoneNumberInput: useStoreWithEqualityFn(
      store,
      (state) => state.setPhoneNumberInput,
      shallow
    ),
    setRefs: useStoreWithEqualityFn(store, (state) => state.setRefs, shallow),
    initialize: useStoreWithEqualityFn(
      store,
      (state) => state.initialize,
      shallow
    ),
    cleanUp: useStoreWithEqualityFn(store, (state) => state.cleanUp, shallow),
    handlePhoneNumberChange: useStoreWithEqualityFn(
      store,
      (state) => state.handlePhoneNumberChange,
      shallow
    ),
    handleCountryCodeChange: useStoreWithEqualityFn(
      store,
      (state) => state.handleCountryCodeChange,
      shallow
    ),
    handleValueChange: useStoreWithEqualityFn(
      store,
      (state) => state.handleValueChange,
      shallow
    ),
    placeInputSelection: useStoreWithEqualityFn(
      store,
      (state) => state.placeInputSelection,
      shallow
    ),
  };
};

export default useCountryCodeStore;
