import { ReactNode, useRef } from 'react';
import createCountryCodeStore from './createCountryCodeStore';
import CountryCodeStoreContext from './CountryCodeStoreContext';

/**
 * A provider component for the `CountryCodeStoreContext`. Every country code
 * selector must have its own state. When creating a custom component that uses
 * Zustand store for the state, the components of the phone number input must
 * be surrounded in `CountryCodeStoreProvider` tags. The combined Zustand
 * component hides this by using a higher order component.
 * @param param0 - Children of the provider component in an object.
 * @alpha
 */
function CountryCodeStoreProvider({ children }: { children: ReactNode }) {
  const storeRef = useRef(createCountryCodeStore());
  return (
    <CountryCodeStoreContext.Provider value={storeRef.current}>
      {children}
    </CountryCodeStoreContext.Provider>
  );
}

export default CountryCodeStoreProvider;
