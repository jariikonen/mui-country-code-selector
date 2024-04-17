import { ReactNode, useRef } from 'react';
import createCountryCodeStore from './createCountryCodeStore';
import CountryCodeStoreContext from './CountryCodeStoreContext';

/**
 * A provider component for the CountryCodeStoreContext that creates a store
 * and sets that as its value.
 * @param param0 Children of the CountryCodeStoreProvider component in an object.
 * @returns jsx
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
