/**
 * A CombinedCountryCodeSelector prop type that is used for defining if the
 * subcomponents of the combined component are wrapped in layout components,
 * and what kind of layout components are used, if they are.
 * @see CCSelectorCombinedProps.layout
 */
type LayoutProp =
  | 'grid'
  | 'gridItems'
  | 'grid2'
  | 'grid2Items'
  | 'stack'
  | 'group'
  | 'row';

export default LayoutProp;
