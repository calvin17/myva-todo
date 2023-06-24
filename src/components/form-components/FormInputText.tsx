import { Controller } from 'react-hook-form';
import TextField from '@mui/material/TextField';
import { FormInputProps } from './FormInputProps';

export const FormInputText = ({ name, control, label, rows }: FormInputProps) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error }, formState }) => (
        <TextField
          helperText={error ? error.message : null}
          size="small"
          error={!!error}
          rows={rows}
          multiline
          onChange={onChange}
          value={value}
          fullWidth
          label={label}
          variant="outlined"
          sx={{ marginBottom: '20px' }}
        />
      )}
    />
  );
};
