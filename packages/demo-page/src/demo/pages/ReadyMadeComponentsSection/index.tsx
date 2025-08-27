import { H2 } from '../../components/TypographyWrappers';
import LayoutWrappers from './LayoutWrappers';
import Variants from './Variants';
import ValidationErrors from './Validation';
import Customization from './Customization';
import Labels from './Labels';

export default function CompositeComponentsSection() {
  return (
    <>
      <H2 id="basic-usage">Ready-made component</H2>
      <Labels />
      <LayoutWrappers />
      <Variants />
      <ValidationErrors />
      <Customization />
    </>
  );
}
