import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TextField, Button, Stack, Typography, Box, FormControl, FormLabel, RadioGroup, FormControlLabel, Radio, Select, MenuItem, InputLabel } from '@mui/material';
import { employeeSchema } from '../validation/employeeSchema';
import FormTextBox from '../components/common/FormTextBox';
import { updateEmployee } from '../services/employeeService';
import { parseYupErrors } from '../helper/parseYupErrors';
import { getCafes } from '../services/cafeService';

function EditCafePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const passedEmployee = location.state?.employee;

  const [employee, setEmployee] = useState(
    passedEmployee || {
      name: '',
      emailAddress: '',
      phoneNumber: '',
      gender: null, // Male = 1, Female = 2
      startDate: '',
      cafeName: '',
    }
  );
  const [errors, setErrors] = useState({});
  const [isDirty, setIsDirty] = useState(false);
  const [cafes, setCafes] = useState([]);

  useEffect(() => {

    //console.log('passedEmployee received:', passedEmployee); 

    async function fetchCafes() {
      try {
        const data = await getCafes();

        const mappedCafes = data.map((cafe) => ({
          id: cafe.id,
          name: cafe.name,
        }));

        setCafes(mappedCafes);
        // Auto-map cafeName to cafeId
        if (passedEmployee?.cafeName) {
          const matchedCafe = mappedCafes.find((c) => c.name === passedEmployee.cafeName);
          if (matchedCafe) {
            setEmployee((prev) => ({
              ...prev,
              cafeId: matchedCafe.id, // add cafeId to employee object
            }));
          }
        }
      } catch (error) {
        console.error('Error fetching cafes:', error);
      }
    }

    fetchCafes();
  }, [passedEmployee]);

  function handleChange(e) {
    const { name, value } = e.target;
    setEmployee((prev) => ({
      ...prev,
      [name]: name === 'startDate' ? value : value,
    }));
    setIsDirty(true);
  }

  async function handleSubmit() {
    try {
      await employeeSchema.validate(employee, { abortEarly: false });
      //console.log('Valid form, ready to submit:', cafe);

      await updateEmployee({
        id: employee.id,
        ...employee,
      });
      alert('Employee updated successfully');
      setIsDirty(false);

      navigate('/employees');
    } catch (error) {
      if (error.name === 'ValidationError') {
        setErrors(parseYupErrors(error));
      } else {
        console.error('Backend API error:', error);
        alert(error.message);
      }
    }
  }

  function handleGenderSelection(value) {
    setEmployee((prev) => ({
      ...prev,
      gender: parseInt(value, 10),
    }));
    setIsDirty(true);
  }

  function handleCancel() {
    if (isDirty) {
      const confirmLeave = window.confirm('You have unsaved changes. Are you sure you want to leave?');
      if (!confirmLeave) return;
    }
    navigate('/employees');
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
            Edit Employee
          </Typography>

          <Stack spacing={2}>
            <FormTextBox label='Employee Name' name='name' value={employee.name} onChange={handleChange} error={errors.name} helperText={errors.name} />
            <FormTextBox label='Email Address' name='emailAddress' value={employee.emailAddress} onChange={handleChange} error={errors.emailAddress} helperText={errors.emailAddress} />
            <FormTextBox label='Mobile Number' name='phoneNumber' value={employee.phoneNumber} onChange={handleChange} error={errors.phoneNumber} helperText={errors.phoneNumber} />

            {/* Gender Radio Buttons */}
            <FormControl>
              <FormLabel>Gender</FormLabel>
              <RadioGroup row name='gender' value={employee.gender} onChange={(e) => handleGenderSelection(e.target.value)}>
                <FormControlLabel value='1' control={<Radio />} label='Male' />
                <FormControlLabel value='2' control={<Radio />} label='Female' />
              </RadioGroup>
            </FormControl>

            {/* Date Picker */}
            <TextField
              label='Start Date'
              name='startDate'
              type='date'
              value={employee.startDate ? employee.startDate.substring(0, 10) : ''}
              onChange={handleChange}
              fullWidth
              error={Boolean(errors.startDate)}
              helperText={errors.startDate}
              InputLabelProps={{
                shrink: true,
              }}
            />

            {/* Dropdown cafe list */}
            <FormControl fullWidth>
              <InputLabel id='cafe-label'>Select Cafe</InputLabel>
              <Select label='Select Cafe' labelId='cafe-label' name='cafeId' value={employee.cafeId || ''} onChange={handleChange} error={Boolean(errors.cafeId)}>
                {cafes.map((cafe) => (
                  <MenuItem key={cafe.id} value={cafe.id}>
                    {cafe.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

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

export default EditCafePage;
