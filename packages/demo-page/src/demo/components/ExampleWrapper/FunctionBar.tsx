import { useCallback, useState } from 'react';
import { Button, IconButton, Tooltip } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import BoltIcon from '@mui/icons-material/Bolt';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';

export interface FunctionBarProps {
  /**
   * A boolean to indicate whether the code is displayed when the component is
   * first rendered.
   */
  showCodeDefault: boolean;

  /** A handler function for the code display toggle. */
  onCodeDisplayToggle: () => void;

  /** A link to open the example to be edited in StackBlitz. */
  stackblitzLink?: string;

  /** A link to open the example to be edited in CodeSandbox. */
  codesandboxLink?: string;
}

export default function FunctionBar({
  showCodeDefault,
  onCodeDisplayToggle,
  stackblitzLink = undefined,
  codesandboxLink = undefined,
}: FunctionBarProps) {
  const [showCode, setShowCode] = useState<boolean>(showCodeDefault);

  const onClick = useCallback(() => {
    setShowCode(!showCode);
    onCodeDisplayToggle();
  }, [onCodeDisplayToggle, showCode]);

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
        {stackblitzLink && (
          <Tooltip title="Open in StackBlitz" arrow>
            <IconButton
              color="primary"
              aria-label="Open in StackBlitz"
              href={stackblitzLink}
            >
              <BoltIcon />
            </IconButton>
          </Tooltip>
        )}
        {codesandboxLink && (
          <Tooltip title="Open in CodeSandbox" arrow>
            <IconButton
              color="primary"
              aria-label="Open in CodeSandbox"
              href={codesandboxLink}
            >
              <CheckBoxOutlineBlankIcon />
            </IconButton>
          </Tooltip>
        )}
      </Grid>
    </Grid>
  );
}
