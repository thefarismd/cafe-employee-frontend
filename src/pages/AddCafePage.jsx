import { useState } from 'react';
import { TextField, Button, Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { cafeSchema } from '../validation/cafeSchema';
import { addCafe } from '../services/cafeService';
import FormTextBox from '../components/common/FormTextBox';
import { parseYupErrors } from '../helper/parseYupErrors';

function AddCafePage() {
  const navigate = useNavigate();

  const [newCafe, setNewCafe] = useState({
    name: '',
    description: '',
    location: '',
  });
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setNewCafe((prev) => ({
      ...prev,
      [name]: value,
    }));
    setIsDirty(true);
  }

  async function handleSubmit() {
    try {
      await cafeSchema.validate(newCafe, { abortEarly: false });
      //console.log('Valid form, ready to submit:', newCafe);

      await addCafe(newCafe);
      alert('Cafe added successfully.');
      setIsDirty(false);

      navigate('/cafes');
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors(parseYupErrors(error));
      } else {
        // Backend API error
        // console.error('Backend API error:', error);
        alert(error.message); 
      }
    }
  }

  function handleCancel() {
    if (isDirty) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    navigate('/cafes');
  }

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        padding: 4,
      }}
    >
      <Box
        sx={{
          width: '100%',
          maxWidth: '600px',
        }}
      >
        <Stack spacing={4}>
          <Typography variant='h4' component='h1'>
            Add New Cafe
          </Typography>

          <Stack spacing={2}>
            <FormTextBox label='Cafe Name' name='name' value={newCafe.name} onChange={handleChange} error={errors.name} helperText={errors.name} />
            <FormTextBox label='Description' name='description' value={newCafe.description} onChange={handleChange} error={errors.description} helperText={errors.description} multiline rows={3} />
            <FormTextBox label='Location' name='location' value={newCafe.location} onChange={handleChange} error={errors.location} helperText={errors.location} />

            {/* TODO: Add logo upload field and validation here in the future */}

            <Stack direction='row' spacing={2}>
              <Button variant='contained' color='primary' onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant='outlined' color='primary' onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default AddCafePage;
