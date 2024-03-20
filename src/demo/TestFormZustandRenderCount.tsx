import { MutableRefObject, useEffect, useReducer, useRef } from 'react';
import { Box, Typography } from '@mui/material';
import CountryCodeSelectorCombined from '../CountryCodeSelectorCombined/CountryCodeSelectorCombinedZustand';

interface TestFormProps {
  selectorRenderCountRef?: MutableRefObject<number>;
  inputRenderCountRef?: MutableRefObject<number>;
}

function TestForm({
  selectorRenderCountRef = undefined,
  inputRenderCountRef = undefined,
}: TestFormProps) {
  return (
    <Box
      sx={{ flexGrow: 1, maxWidth: '600px' }}
      style={{ margin: '2rem 1rem' }}
    >
      <Typography align="left" variant="h5" style={{ marginBottom: '1rem' }}>
        Just a simple CountryCodeSelectorCombinedZustand component
      </Typography>
      <CountryCodeSelectorCombined
        selectorRenderCountRef={selectorRenderCountRef}
        inputRenderCountRef={inputRenderCountRef}
      />
    </Box>
  );
}

interface RenderCounterProps {
  selectorRenderCountRef: MutableRefObject<number>;
  inputRenderCountRef: MutableRefObject<number>;
}

function RenderCounter({
  selectorRenderCountRef,
  inputRenderCountRef,
}: RenderCounterProps) {
  const previousSelectorCountRef = useRef<number | null>(null);
  const previousInputCountRef = useRef<number | null>(null);
  const [, forceRerender] = useReducer((x: number) => x + 1, 0);

  useEffect(() => {
    setInterval(() => {
      if (
        previousSelectorCountRef.current !== selectorRenderCountRef.current ||
        previousInputCountRef.current !== inputRenderCountRef.current
      ) {
        forceRerender();
        previousSelectorCountRef.current = selectorRenderCountRef.current;
        previousInputCountRef.current = inputRenderCountRef.current;
      }
    }, 100);
  }, [inputRenderCountRef, selectorRenderCountRef]);

  return (
    <>
      <p>selector: {selectorRenderCountRef.current}</p>
      <p>input: {inputRenderCountRef.current}</p>
    </>
  );
}

function RenderPage() {
  const selectorRenderCountRef = useRef(0);
  const inputRenderCountRef = useRef(0);

  return (
    <>
      <TestForm
        selectorRenderCountRef={selectorRenderCountRef}
        inputRenderCountRef={inputRenderCountRef}
      />
      <RenderCounter
        selectorRenderCountRef={selectorRenderCountRef}
        inputRenderCountRef={inputRenderCountRef}
      />
    </>
  );
}

export default RenderPage;
