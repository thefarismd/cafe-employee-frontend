import { useState, useEffect } from 'react';
import { Typography, Button, Stack, TextField, Box, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
import { AgGridReact } from 'ag-grid-react';
import DeleteModal from '../components/modals/DeleteModal';
import { useNavigate } from 'react-router-dom';
import { deleteEmployee, getEmployees } from '../services/employeeService';
import { employeeColumns } from '../grids/EmployeeColumns';

function EmployeesPage() {
  const [employees, setEmployees] = useState([]);
  const [cafeInput, setCafeInput] = useState('');
  const [cafeFilter, setCafeFilter] = useState('');
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [employeeToDelete, setEmployeeToDelete] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const data = await getEmployees(cafeFilter);
      setEmployees(data);
    }
    fetchData();
  }, [cafeFilter]);

  function handleFilter() {
    setCafeFilter(cafeInput);
  }

  function handleEdit(employee) {

    navigate('/employees/edit', { state: { employee } });
  }

  function handleDelete(employee) {
    setEmployeeToDelete(employee); // store which cafe user wants to delete
    setOpenDeleteDialog(true); // open confirm dialog
  }

  // Delete cafe
  async function confirmDeleteEmployee() {
    if (!employeeToDelete) return;

    try {
      await deleteEmployee(employeeToDelete.id);
      const data = await getEmployees(cafeFilter);
      setEmployees(data);
      alert('Employee deleted successfully');   
    } catch (error) {
      //console.error('Error deleting cafe:', error);
      alert(error.message);
    } finally {
      setOpenDeleteDialog(false);
      setEmployeeToDelete(null);
    }
  }

  return (
    <Stack spacing={4} padding={4}>
      <Typography variant='h4' component='h1'>
        Employee Management Portal
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
          <TextField label='Filter by Cafe' variant='outlined' size='small' value={cafeInput} onChange={(e) => setCafeInput(e.target.value)} />
          <Button variant='contained' color='secondary' onClick={handleFilter}>
            Apply Filter
          </Button>
        </Box>

        {/* Right side: Add New Employee and Back to Homepage */}
        <Stack direction='row' spacing={2}>
          <Button variant='contained' color='secondary' onClick={() => navigate('/employees/add')}>
            Add New Employee
          </Button>
          <Button variant='contained' color='secondary' onClick={() => navigate('/')}>
            Back to Homepage
          </Button>
        </Stack>
      </Box>

      <div className='ag-theme-alpine' style={{ height: 400, width: '100%' }}>
        <AgGridReact rowData={employees} columnDefs={employeeColumns(handleEdit, handleDelete)} pagination={true} paginationPageSize={10} paginationPageSizeSelector={[10, 20]} />
      </div>

      {/* Delete Employee Dialog */}
      <DeleteModal openDeleteDialog={openDeleteDialog} setOpenDeleteDialog={setOpenDeleteDialog} itemToDelete={employeeToDelete} confirmDelete={confirmDeleteEmployee} itemType='employee'/>
    </Stack>
  );
}

export default EmployeesPage;
