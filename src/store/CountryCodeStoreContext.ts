import { createContext } from 'react';
import createCountryCodeStore from './createCountryCodeStore';

/**
 * A React context for providing the country code store to the
 * CountryCodeSelectors and phone number inputs. By wrapping selector input
 * pairs into CountryCodeStoreContext providers they can have their own state
 * instead of a global one.
 */
const CountryCodeStoreContext = createContext<ReturnType<
  typeof createCountryCodeStore
> | null>(null);

export default CountryCodeStoreContext;
