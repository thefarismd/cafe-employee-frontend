import { useState, useEffect } from 'react';
import { TextField, Button, Stack, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { employeeSchema } from '../validation/employeeSchema';
import { addEmployee } from '../services/employeeService';
import FormTextBox from '../components/common/FormTextBox';
import { getCafes } from '../services/cafeService';
import { parseYupErrors } from '../helper/parseYupErrors';
import { startOfToday, format } from 'date-fns';

function AddEmployeePage() {
  const navigate = useNavigate();

  const [newEmployee, setNewEmployee] = useState({
    name: '',
    emailAddress: '',
    phoneNumber: '',
    gender: 1, // Default Male (1), Male = 1, Female = 2
    startDate: format(startOfToday(), 'yyyy-MM-dd'),
    cafeId: '',
  });
  const [errors, setErrors] = useState({});
  const [cafes, setCafes] = useState([]);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    async function fetchCafes() {
      try {
        const data = await getCafes();
        setCafes(data);
      } catch (error) {
        console.error('Error fetching cafes:', error);
      }
    }

    fetchCafes();
  }, []);

  function handleChange(e) {
    const { name, value } = e.target;

    setNewEmployee((prev) => ({
      ...prev,
      [name]: name === 'startDate' ? format(new Date(value), 'yyyy-MM-dd') : value,
    }));

    setIsDirty(true);
  }

  async function handleSubmit() {
    try {
      await employeeSchema.validate(newEmployee, { abortEarly: false });
      //console.log('Valid form, ready to submit:', newEmployee);
      //console.log('Submitting employee object to API:', newEmployee);
      alert('Employee added successfully');
      await addEmployee(newEmployee);
      setIsDirty(false);

      navigate('/employees');
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
    navigate('/employees');
  }

  function handleGenderSelection(value) {
    setNewEmployee((prev) => ({
      ...prev,
      gender: parseInt(value, 10),
    }));
    setIsDirty(true);
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
            Add New Employee
          </Typography>

          <Stack spacing={2}>
            <FormTextBox label='Employee Name' name='name' value={newEmployee.name} onChange={handleChange} error={errors.name} helperText={errors.name} />
            <FormTextBox label='Email Address' name='emailAddress' value={newEmployee.emailAddress} onChange={handleChange} error={errors.emailAddress} helperText={errors.emailAddress} />
            <FormTextBox label='Mobile Number' name='phoneNumber' value={newEmployee.phoneNumber} onChange={handleChange} error={errors.phoneNumber} helperText={errors.phoneNumber} />

            {/* Gender Radio Buttons */}
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row name='gender' value={newEmployee.gender} onChange={(e) => handleGenderSelection(e.target.value)}>
                <FormControlLabel value='1' control={<Radio />} label='Male' />
                <FormControlLabel value='2' control={<Radio />} label='Female' />
              </RadioGroup>
            </FormControl>

            {/* Start Date Picker */}

            <TextField
              label='Start Date'
              name='startDate'
              type='date'
              value={newEmployee.startDate || ''}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.startDate)}
              helperText={errors.startDate}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Dropdown cafe list */}
            <FormControl fullWidth error={Boolean(errors.cafeId)}>
              <InputLabel id='cafe-label'>Select Cafe</InputLabel>
              <Select label='Select Cafe' labelId='cafe-label' name='cafeId' value={newEmployee.cafeId} onChange={handleChange} error={Boolean(errors.cafeId)} >
                {/* Default empty selection */}
                <MenuItem value=''>
                  <em>-- Select Cafe --</em>
                </MenuItem>
                {cafes.map((cafe) => (
                  <MenuItem key={cafe.id} value={cafe.id}>
                    {cafe.name}
                  </MenuItem>
                ))}
              </Select>
              {errors.cafeId && (
                <Typography variant='caption' color='error'>
                  {errors.cafeId}
                </Typography>
              )}
            </FormControl>

            <Stack direction='row' spacing={2}>
              <Button variant='contained' color='secondary' onClick={handleSubmit}>
                Submit
              </Button>
              <Button variant='outlined' color='secondary' onClick={handleCancel}>
                Cancel
              </Button>
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}

export default AddEmployeePage;
