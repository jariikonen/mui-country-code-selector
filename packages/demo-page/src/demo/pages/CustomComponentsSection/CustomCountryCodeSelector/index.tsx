import { CountryCodeStoreProvider } from 'mui-country-code-selector';
import CustomCountryCodeSelectorInner, {
  CustomCountryCodeSelectorProps,
} from './CustomCountryCodeSelectorInner';

export default function CustomCountryCodeSelector({
  value = undefined,
  onChange = undefined,
}: CustomCountryCodeSelectorProps) {
  return (
    <CountryCodeStoreProvider>
      <CustomCountryCodeSelectorInner value={value} onChange={onChange} />
    </CountryCodeStoreProvider>
  );
}
