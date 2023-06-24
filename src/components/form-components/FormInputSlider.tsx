import React, { useEffect } from 'react';
import { FormLabel, Slider } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';

const marks = [
  {
    value: 0,
    label: 'minor',
  },
  {
    value: 50,
    label: 'major',
  },
  {
    value: 100,
    label: 'critical',
  },
];

export const FormInputSlider = ({ name, control, setValue, label }: FormInputProps) => {
  const [sliderValue, setSliderValue] = React.useState<number>(30);

  useEffect(() => {
    if (sliderValue) setValue(name, sliderValue);
  }, [name, setValue, sliderValue]);

  const handleChange = (event: any, newValue: number | number[]) => {
    setSliderValue(newValue as number);
  };

  const valuetext = (value: number) => {
    return `${value}`;
  };

  const valueLabelFormat = (value: number) => {
    return marks.findIndex((mark) => mark.value === value) + 1;
  };

  return (
    <>
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState, formState }) => (
          <Slider
            value={sliderValue}
            defaultValue={0}
            onChange={handleChange}
            valueLabelFormat={valueLabelFormat}
            getAriaValueText={valuetext}
            step={null}
            marks={marks}
            sx={{ width: '300px', marginTop: '10px' }}
          />
        )}
      />
    </>
  );
};
