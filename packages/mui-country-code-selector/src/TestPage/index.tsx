import { Container, CssBaseline, Typography } from '@mui/material';
import ControlledFormExampleZustand from './ControlledFormExampleZustand';
import ControlledFormExampleReact from './ControlledFormExampleReact';
import UncontrolledFormExampleZustand from './UncontrolledFormExampleZustand';
import UncontrolledFormExampleReact from './UncontrolledFormExampleReact';
import SimpleSelector from './SimpleSelector';

interface TestPageProps {
  form?: boolean;
}

export default function TestPage({ form = false }: TestPageProps) {
  if (form) {
    return (
      <Container sx={{ pb: { xs: 5 } }}>
        <CssBaseline />
        <Typography variant="h4" sx={{ mb: { xs: 3 }, mt: { xs: 2 } }}>
          MUI Country Code Selector Test Page
        </Typography>
        <Typography variant="h5" sx={{ mb: { xs: 3 }, mt: { xs: 5 } }}>
          As a controlled component (zustand)
        </Typography>
        <ControlledFormExampleZustand />
        <Typography variant="h5" sx={{ mb: { xs: 3 }, mt: { xs: 5 } }}>
          As a controlled component (React)
        </Typography>
        <ControlledFormExampleReact />
        <Typography variant="h5" sx={{ mb: { xs: 3 }, mt: { xs: 5 } }}>
          As an uncontrolled component (zustand)
        </Typography>
        <UncontrolledFormExampleZustand />
        <Typography variant="h5" sx={{ mb: { xs: 3 }, mt: { xs: 5 } }}>
          As an uncontrolled component (React)
        </Typography>
        <UncontrolledFormExampleReact />
      </Container>
    );
  }
  return (
    <Container>
      <CssBaseline />
      <SimpleSelector limitOptions={3} />
    </Container>
  );
}
