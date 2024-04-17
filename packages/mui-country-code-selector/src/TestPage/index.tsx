import { Container, CssBaseline, Typography } from '@mui/material';
import ControlledFormExample from './ControlledFormExample';
import UncontrolledFormExample from './UncontrolledFormExample';

export default function TestPage() {
  return (
    <Container>
      <CssBaseline />
      <Typography variant="h4" sx={{ mb: { xs: 3 }, mt: { xs: 3 } }}>
        MUI Country Code Selector Test Page
      </Typography>
      <Typography variant="h5" sx={{ mb: { xs: 3 }, mt: { xs: 3 } }}>
        As a controlled component
      </Typography>
      <ControlledFormExample />
      <Typography variant="h5" sx={{ mb: { xs: 3 }, mt: { xs: 3 } }}>
        As an uncontrolled component
      </Typography>
      <UncontrolledFormExample />
    </Container>
  );
}
