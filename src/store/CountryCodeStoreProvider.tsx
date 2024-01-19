import { ReactNode } from 'react';
import createCountryCodeStore from './createCountryCodeStore';
import CountryCodeStoreContext from './CountryCodeStoreContext';

/**
 * A provider component for the CountryCodeStoreContext that creates a store
 * and sets that as its value.
 * @param children of the CountryCodeStoreProvider component
 * @returns jsx
 */
function CountryCodeStoreProvider({ children }: { children: ReactNode }) {
  const store = createCountryCodeStore();
  return (
    <CountryCodeStoreContext.Provider value={store}>
      {children}
    </CountryCodeStoreContext.Provider>
  );
}

export default CountryCodeStoreProvider;
