import * as React from 'react';
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';

function valuetext(value) {
  return `${value}`;
}

export default function DiscreteSlider({ value, onChange }) {
  return (
    <Box margin={1} width={200}>
      <Slider
        aria-label="Small steps"
        size={'small'}
        value={value}
        getAriaValueText={valuetext}
        valueLabelDisplay="auto"
        onChange={e => onChange(e.target.value)}
        step={1}
        marks
        min={1}
        max={10}
      />
    </Box>
  );
}