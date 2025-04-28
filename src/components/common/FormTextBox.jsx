import { TextField } from '@mui/material';

function FormTextBox({ label, name, value, onChange, error, helperText, ...rest }) {
  return (
    <TextField
      label={label}
      name={name}
      value={value}
      onChange={onChange}
      error={!!error}
      helperText={helperText}
      fullWidth
      variant='outlined'
      {...rest} 
    />
  );
}

export default FormTextBox;
