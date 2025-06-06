/**
 * Represents a value of the `CompositeCountryCodeSelector`'s prop that defines
 * what kind of layout components its subcomponents are wrapped in, if any.
 * @alpha
 */
type LayoutProp =
  | 'gridLegacy'
  | 'gridLegacyItems'
  | 'grid'
  | 'gridItems'
  | 'stack'
  | 'group'
  | 'row';

export default LayoutProp;
