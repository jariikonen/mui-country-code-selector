import { ReactNode, useCallback, useState } from 'react';
import { Box, Divider } from '@mui/material';
import CodeBox from '../CodeBox';
import FunctionBar from './FunctionBar';

export interface ExampleWrapperProps {
  children: ReactNode;
  tsCodePath?: string;
}

export function ExampleWrapper({
  children,
  tsCodePath = undefined,
}: ExampleWrapperProps) {
  const codeBoxStyle = {
    lineHeight: '1',
    fontSize: '1rem',
    borderRadius: '0 0 0.5rem 0.5rem',
    padding: '1rem 1.5rem 1rem 1.5rem',
    margin: 0,
  };

  const [showCode, setShowCode] = useState<boolean>(false);

  const onCodeToggle = useCallback(() => {
    setShowCode(!showCode);
  }, [showCode]);

  return (
    <Box
      sx={{
        border: 1,
        borderColor: 'silver',
        borderRadius: '0.5rem',
        mt: { xs: 3 },
        mb: { xs: 2 },
        pb: 0,
      }}
    >
      <Box sx={{ p: { xs: '2rem' } }}>{children}</Box>
      <Divider />
      <FunctionBar showCodeDefault={false} onCodeToggle={onCodeToggle} />
      {tsCodePath && showCode && (
        <CodeBox tsPath={tsCodePath} style={codeBoxStyle} embedded />
      )}
    </Box>
  );
}
