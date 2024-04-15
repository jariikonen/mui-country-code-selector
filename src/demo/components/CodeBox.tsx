/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism';

export interface CodeBoxProps {
  /**
   * A path fragment that uniquely identifies the correct TypeScript code
   * fragment among the other imported code snippets. The first snippet whose
   * path includes this property is displayed in the CodeBox.
   */
  tsPath: string;

  /** Custom CSS style properties for the syntax highlighter. */
  style?: React.CSSProperties;

  /**
   * Boolean indicating whether the component is embedded, i.e, whether its
   * surrounding box has margins or not (embedded component's box does not have
   * margins).
   */
  embedded?: boolean;

  /**
   * The max-height css property of the code box. Default value is 20rem.
   */
  maxHeight?: React.CSSProperties['maxHeight'];
}

/**
 * Renders a syntax highlighted code box.
 */
export default function CodeBox({
  tsPath,
  style = undefined,
  embedded = false,
  maxHeight = '20rem',
}: CodeBoxProps) {
  const defaultStyle = {
    lineHeight: '1',
    fontSize: '1rem',
    borderRadius: '0.5rem',
    padding: '1rem 1.5rem 1rem 1.5rem',
    maxHeight,
    overflow: 'auto',
    scrollbarColor: 'lightsteelblue transparent',
  };
  const styleToUse = style ?? defaultStyle;

  const defaultSx = { mt: { xs: 2 }, mb: { xs: 3 } };
  const embeddedSx = { mt: 0, mb: 0 };
  const sxToUse = embedded ? embeddedSx : defaultSx;

  /**
   * All code sample modules imported into a Record object.
   * @see {@link https://vitejs.dev/guide/features.html#glob-import}
   */
  const codeSamples = import.meta.glob(
    [
      '../pages/*/*Example.tsx',
      '../pages/*/*Snippet.txt',
      '../pages/*/*/*Example.tsx',
      '../pages/*/*/*Snippet.txt',
      '../pages/*/*/*/*Example.tsx',
      '../pages/*/*/*/*Snippet.txt',
      '../pages/CustomComponentsSection/CustomCountryCodeSelector/CustomCountryCodeSelectorInner.tsx',
      '../pages/CustomComponentsSection/CustomCountryCodeSelector/index.tsx',
    ],
    {
      query: '?raw',
      import: 'default',
    }
  );
  const [tsCode, setTSCode] = useState('');

  useEffect(() => {
    async function importCode() {
      const tsCodeKey = Object.keys(codeSamples).find((m) =>
        m.includes(tsPath)
      );
      if (tsCodeKey) {
        const tsCodeString = (await codeSamples[tsCodeKey]()) as string;
        if (tsCodeString && typeof tsCodeString === 'string') {
          setTSCode(tsCodeString);
        }
      }
    }
    void importCode(); // eslint-disable-line no-void
  }, [codeSamples, tsPath]);

  return (
    <Box sx={sxToUse}>
      <SyntaxHighlighter
        language="typescript"
        style={dracula}
        customStyle={styleToUse}
      >
        {tsCode}
      </SyntaxHighlighter>
    </Box>
  );
}
