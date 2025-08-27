import { H2 } from '../../components/TypographyWrappers';
import AsAControlledComponent from './AsAControlledComponent';
import AsAnUncontrolledComponent from './AsAnUncontrolledComponent';
import Installation from './Installation';

export default function BasicUsage() {
  return (
    <>
      <H2 id="basic-usage">Basic usage</H2>
      <Installation />
      <AsAControlledComponent />
      <AsAnUncontrolledComponent />
    </>
  );
}
