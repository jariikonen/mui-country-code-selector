import { H3, H4, H5, P } from '../../../components/TypographyWrappers';
import A from '../../../components/Link';
import CodeBox from '../../../components/CodeBox';
import { ExampleWrapper } from '../../../components/ExampleWrapper';
import LayoutWrappersExample from './LayoutWrappersExample';

export default function LayoutWrappers() {
  return (
    <>
      <H3 id="layout-wrappers">Layout wrappers</H3>
      <P>
        The MUI Country Code Selector component combines two sub-components, a
        selector and a phone number input, and in order for them to look good on
        screen, you might want to wrap them in some additional layout
        components. The composite components provide the <code>layout</code>{' '}
        prop for setting what kind of layout components the subcomponents are
        wrapped in. It accepts the following values: <code>grid</code>,{' '}
        <code>gridItems</code>, <code>grid2</code>, <code>grid2Items</code>,{' '}
        <code>stack</code>, <code>group</code>, and <code>row</code>. Option{' '}
        <code>grid</code> wraps the components into MUI{' '}
        <A href="https://mui.com/material-ui/react-grid/" newTab>
          Grid
        </A>{' '}
        <i>item</i> components and creates a Grid <i>container</i> around them.
        Option <code>gridItems</code> just wraps the components into Grid items
        and leaves the surrounding container out. Options <code>grid2</code> and{' '}
        <code>grid2Items</code> do the same with MUI{' '}
        <A href="https://mui.com/material-ui/react-grid2/" newTab>
          Grid2
        </A>{' '}
        components. Option <code>stack</code> wraps the components in a MUI{' '}
        <A href="https://mui.com/material-ui/react-stack/" newTab>
          Stack
        </A>{' '}
        component, and with the <code>group</code> option the components are
        wrapped in a MUI{' '}
        <A href="https://mui.com/material-ui/api/form-group/" newTab>
          FormGroup
        </A>{' '}
        component. Option <code>row</code> is just a more convenient way to wrap
        the components in MUI FormGroup and give the FormGroup a{' '}
        <code>row</code> prop at one go. The <code>row</code> prop makes the
        FormGroup render its children in a horizontal row.
      </P>
      <H4>Grids</H4>
      <H5>As an individual grid</H5>
      <P>
        With the <code>grid</code> and <code>grid2</code> options the composite
        country code selector component can be laid out in its own MUI Grid
        component. This creates the country code components their own Grid
        component, which can then be placed anywhere on the page.
      </P>
      <CodeBox tsPath="LayoutWrappers/GridSnippet" />
      <H5>As items to an existing grid</H5>
      <P>
        If the component is placed in a form that is already laid out with MUI
        Grid or Grid2 components, it is probably easiest to use the{' '}
        <code>gridItems</code> or <code>grid2Items</code> wrapper. They wrap the
        subcomponents in their own grid item components, which can work as part
        of an already existing grid.
      </P>
      <CodeBox tsPath="LayoutWrappers/GridItemsSnippet" />
      <H5>Default sizes</H5>
      <P>
        Grid wrappers give the subcomponents default sizes. Since the grid
        container has 12 columns by default, the selector is given a size of 4
        columns, the phone number input is given a size of 8 columns, and the
        error message is given a size of full 12 columns. These defaults can be
        overridden with the <code>selectorSize</code>, <code>inputSize</code>,
        and <code>errorSize</code> props or with <code>gridSelectorProps</code>,{' '}
        <code>gridInputProps</code>, and <code>gridErrorProps</code>, and their
        Grid2 equivalents.
      </P>
      <H4>Stack</H4>
      <P>
        Option <code>stack</code> wraps country code components in a MUI Stack
        component. As opposed to grids, which handle two-dimensional layouts,
        stacks manage one-dimensional layout of their immediate children along
        the vertical or horizontal axis. The default direction of the stack is
        vertical, and if the country code selector and phone number input should
        be laid out in a row, the direction must be changed using the{' '}
        <code>stackProps</code> prop.
      </P>
      <CodeBox tsPath="LayoutWrappers/StackSnippet" />
      <P>
        By default the Stack does not wrap the overflowing components to a
        second line. This means that the error message should also be able to
        fit in one row, unless the component is set to use flexbox gap as the
        spacing implementation. This can be done by setting{' '}
        <code>useFlexGap: true</code> and{' '}
        <code>flexWrap: &apos;wrap&apos;</code> with the <code>stackProps</code>{' '}
        prop (see the <A href="#example">example</A> below).
      </P>
      <P>
        The stack wrapper does not give any default sizes to the selector and
        the input components, so they must be set using the{' '}
        <code>selectorProps</code> and <code>inputProps</code> props. Spacing
        between the items can be set with Stack&lsquo;s <code>spacing</code>{' '}
        prop.
      </P>
      <H4>FormGroup</H4>
      <P>
        The <code>group</code> and <code>row</code> options wrap the components
        in a MUI FormGroup component. FormGroup groups the components together
        and the <code>row</code> prop gives it a row layout. Like the stack
        wrapper, these wrappers do not give the subcomponents default sizes.
        Unlike the Stack, FormGroup does not have a way to specify spacing
        between its children. The spacing and component sizes can be set with
        the <code>selectorProps</code> and <code>inputProps</code> props.
      </P>
      <CodeBox tsPath="LayoutWrappers/GroupSnippet" />
      <P>
        The row wrapper makes using the FormGroup with a <code>row</code> prop a
        little bit more convenient.
      </P>
      <CodeBox tsPath="LayoutWrappers/RowSnippet" />
      <H4>Passing props to layout components</H4>
      <P>
        There are many props that can be used for passing properties to the
        different layout components added by the layout wrappers. For example{' '}
        <code>formGroupProps</code>, <code>gridContainerProps</code>,{' '}
        <code>gridItemProps</code>, <code>gridSelectorProps</code>,{' '}
        <code>gridInputProps</code>, <code>gridErrorProps</code>, and{' '}
        <code>stackProps</code> can be used to pass props to their respective
        components. There are also three convenience props that can be used to
        set often used values: <code>selectorSize</code>, <code>inputSize</code>
        , and <code>errorSize</code>. These set the sizes of their respective
        grid components (when using Grid or Grid2 wrappers). See the{' '}
        <A href="#">API documentation</A> for more information on how to use
        these props.
      </P>
      <H4 id="example">Example</H4>
      <ExampleWrapper tsCodePath="LayoutWrappers/LayoutWrappersExample">
        <LayoutWrappersExample />
      </ExampleWrapper>
    </>
  );
}
