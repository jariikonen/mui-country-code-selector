import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
} from '@mui/material';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

interface RenderCountDisplayProps {
  data: { label: string; value: number }[];
}

export default function RenderCountDisplay({ data }: RenderCountDisplayProps) {
  return (
    <TableContainer component={Box} sx={{ width: 400 }}>
      <Table
        sx={{ minWidth: 400 }}
        size="small"
        aria-label="render count display"
      >
        <TableHead>
          <TableRow>
            <TableCell>Component</TableCell>
            <TableCell align="center">Number of renders</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map((row) => (
            <TableRow
              key={row.label}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.label}
              </TableCell>
              <TableCell align="center">{row.value}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
