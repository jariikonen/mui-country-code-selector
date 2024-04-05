import { H3 } from '../../TypographyWrappers';
import AsAControlledComponent from './AsAControlledComponent';
import AsAnUncontrolledComponent from './AsAnUncontrolledComponent';
import DefaultValue from './DefaultValue';

export default function BasicUsage() {
  return (
    <>
      <H3 id="basic-usage">Basic usage</H3>
      <AsAControlledComponent />
      <AsAnUncontrolledComponent />
      <DefaultValue />
    </>
  );
}
