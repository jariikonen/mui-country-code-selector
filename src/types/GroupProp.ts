/**
 * A CombinedCountryCodeSelector prop type that is used for defining if and how
 * the country code selector and phone number input components are grouped
 * together in the layout.
 * @see CCSelectorCombinedProps.group
 */
type GroupProp =
  | 'grid'
  | 'gridItems'
  | 'grid2'
  | 'grid2Items'
  | 'row'
  | true
  | false;

export default GroupProp;
