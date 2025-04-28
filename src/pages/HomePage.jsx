import { Button, Stack, Typography, Box } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function HomePage() {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        flex: 1, 
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        gap: 4, 
      }}
    >
      <Typography variant='h4' component='h1'>
        Welcome to NCS Cafe Employee System
      </Typography>

      <Stack direction='row' spacing={4}>
        <Button variant='contained' color='primary' onClick={() => navigate('/cafes')}>
          Manage Cafes
        </Button>
        <Button variant='contained' color='secondary' onClick={() => navigate('/employees')}>
          Manage Employees
        </Button>
      </Stack>
    </Box>
  );
}

export default HomePage;
