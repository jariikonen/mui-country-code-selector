import { useContext } from 'react';
import { useStore } from 'zustand';
import CountryCodeStoreContext from './CountryCodeStoreContext';

/**
 * A custom hook that returns a country code store. Store is fetched through a
 * React context CountryCodeStoreContext and therefore the component using this
 * hook is expected to be surrounded by CountryCodeStoreProvider tags.
 */
const useCountryCodeStore = () => {
  const storeContext = useContext(CountryCodeStoreContext);
  if (storeContext === null) {
    throw new Error(
      'no provider - please, surround the component with CountryCodeStoreProvider tags'
    );
  }
  return useStore(storeContext);
};

export default useCountryCodeStore;
