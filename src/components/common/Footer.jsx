import { Box, Typography } from '@mui/material';

function Footer() {
  return (
    <Box
      sx={{
        width: '100%',
        color: 'black',
        textAlign: 'center',
        py: 2, 
        mt: 'auto', 
      }}
    >
      <Typography variant='body2'>thefarismd © {new Date().getFullYear()} Cafe Employee System.</Typography>
    </Box>
  );
}

export default Footer;
