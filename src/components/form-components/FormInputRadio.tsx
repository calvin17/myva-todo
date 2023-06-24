import React from 'react';
import { FormControl, FormControlLabel, FormLabel, Radio, RadioGroup } from '@mui/material';
import { Controller } from 'react-hook-form';
import { FormInputProps } from './FormInputProps';

export const FormInputRadio: React.FC<FormInputProps> = ({ name, control, label, options }) => {
  const generateRadioOptions = () => {
    return options.map(
      (singleOption: {
        value: unknown;
        label:
          | string
          | number
          | boolean
          | React.ReactElement<any, string | React.JSXElementConstructor<any>>
          | React.ReactFragment
          | React.ReactPortal
          | null
          | undefined;
      }) => <FormControlLabel value={singleOption.value} label={singleOption.label} control={<Radio />} />
    );
  };

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
          <RadioGroup value={value} onChange={onChange}>
            {generateRadioOptions()}
          </RadioGroup>
        )}
      />
    </FormControl>
  );
};
