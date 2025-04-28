import { useState, useEffect } from 'react';
import { Typography, Button, Stack, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import { getCafes, deleteCafe } from '../services/cafeService';
import { cafesColumns } from '../grids/cafesColumns';
import DeleteModal from '../components/modals/DeleteModal';
import { useNavigate } from 'react-router-dom';

function CafesPage() {
  const [cafes, setCafes] = useState([]);
  const [locationInput, setLocationInput] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [cafeToDelete, setCafeToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getCafes(locationFilter);
      setCafes(data);
    }
    fetchData();
  }, [locationFilter]);

  function handleFilter() {
    setLocationFilter(locationInput);
  }

  function handleEdit(cafe) {
    navigate('/cafes/edit', { state: { cafe } });
  }

  function handleDelete(cafe) {
    setCafeToDelete(cafe); // store which cafe user wants to delete
    setOpenDeleteDialog(true); // open confirm dialog
  }

  // Delete cafe
  async function confirmDeleteCafe() {
    if (!cafeToDelete) return;

    try {
      await deleteCafe(cafeToDelete.id);
      const data = await getCafes(locationFilter);
      setCafes(data);
      alert('Cafe deleted successfully.');
    } catch (error) {
      alert(error.message);
    } finally {
      setOpenDeleteDialog(false);
      setCafeToDelete(null);
    }
  }

  return (
    <Stack spacing={4} padding={4}>
      <Typography variant='h4' component='h1'>
        Cafes Management Portal
      </Typography>

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        {/* Left side: Filter TextField + Apply Filter Button */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
          <TextField label='Filter by Location' variant='outlined' size='small' value={locationInput} onChange={(e) => setLocationInput(e.target.value)} />
          <Button variant='contained' color='primary' onClick={handleFilter}>
            Apply Filter
          </Button>
        </Box>

        {/* Right side: Add New Cafe and Back to Homepage */}
        <Stack direction='row' spacing={2}>
          <Button variant='contained' color='primary' onClick={() => navigate('/cafes/add')}>
            Add New Cafe
          </Button>
          <Button variant='contained' color='primary' onClick={() => navigate('/')}>
            Back to Homepage
          </Button>
        </Stack>
      </Box>

      <div className='ag-theme-alpine' style={{ height: 400, width: '100%' }}>
        <AgGridReact rowData={cafes} columnDefs={cafesColumns(handleEdit, handleDelete)} pagination={true} paginationPageSize={10} paginationPageSizeSelector={[10, 20]} />
      </div>

      {/* Delete Cafe Dialog */}
      <DeleteModal openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} itemToDelete={cafeToDelete} confirmDelete={confirmDeleteCafe} itemType='cafe' />
    </Stack>
  );
}

export default CafesPage;
