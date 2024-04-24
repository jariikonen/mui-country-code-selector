import { ReactNode, useCallback, useState } from 'react';
import { Box, Divider } from '@mui/material';
import CodeBox from '../CodeBox';
import FunctionBar from './FunctionBar';

export interface ExampleWrapperProps {
  /** The child nodes, i.e., the nodes to be wrapped as an example. */
  children: ReactNode;

  /**
   * A path fragment that uniquely identifies the correct TypeScript code
   * fragment among the other imported code snippets. The first snippet whose
   * path includes this property is displayed in a toggleable CodeBox.
   * @see CodeBoxProps.tsPath
   */
  tsCodePath?: string;

  /** A link to open the example to be edited in StackBlitz. */
  stackblitzLink?: string;

  /** A link to open the example to be edited in CodeSandbox. */
  codesandboxLink?: string;

  /**
   * The max-height css property of the toggleable code box. Default value is
   * 20rem.
   */
  codeMaxHeight?: React.CSSProperties['maxHeight'];
}

export function ExampleWrapper({
  children,
  tsCodePath = undefined,
  stackblitzLink = undefined,
  codesandboxLink = undefined,
  codeMaxHeight = '25rem',
}: ExampleWrapperProps) {
  const codeBoxStyle = {
    lineHeight: '1',
    fontSize: '1rem',
    borderRadius: '0 0 0.5rem 0.5rem',
    padding: '1rem 1.5rem 1rem 1.5rem',
    margin: 0,
    maxHeight: codeMaxHeight,
    overflow: 'auto',
    scrollbarColor: 'lightsteelblue transparent',
  };

  const [showCode, setShowCode] = useState<boolean>(false);

  const onCodeDisplayToggle = useCallback(() => {
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
      <FunctionBar
        showCodeDefault={false}
        onCodeDisplayToggle={onCodeDisplayToggle}
        stackblitzLink={stackblitzLink}
        codesandboxLink={codesandboxLink}
      />
      {tsCodePath && showCode && (
        <CodeBox tsPath={tsCodePath} style={codeBoxStyle} embedded />
      )}
    </Box>
  );
}
