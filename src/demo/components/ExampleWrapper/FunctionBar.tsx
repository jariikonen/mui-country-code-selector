import { useCallback, useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export interface FunctionBarProps {
  showCodeDefault: boolean;
  onCodeToggle: () => void;
}

export default function FunctionBar({
  showCodeDefault,
  onCodeToggle,
}: FunctionBarProps) {
  const [showCode, setShowCode] = useState<boolean>(showCodeDefault);

  const onClick = useCallback(() => {
    setShowCode(!showCode);
    onCodeToggle();
  }, [onCodeToggle, showCode]);

  return (
    <Grid
      container
      direction="row"
      justifyContent="flex-end"
      flexGrow={1}
      columnSpacing={{ xs: 1 }}
      sx={{ m: { xs: 1 } }}
    >
      <Grid>
        <Tooltip title="Toggle code display" arrow>
          <Button variant="text" size="small" onClick={onClick}>
            {showCode ? 'hide code' : 'show code'}
          </Button>
        </Tooltip>
        <Tooltip title="Open in StackBlitz" arrow>
          <IconButton color="primary" aria-label="Open in StackBlitz">
            <BoltIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Open in CodeSandbox" arrow>
          <IconButton color="primary" aria-label="Open in CodeSandbox">
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Tooltip>
      </Grid>
    </Grid>
  );
}
