import { MdEdit, MdDelete } from 'react-icons/md';

export const employeeColumns = (handleEdit, handleDelete) => [
  { field: 'id', headerName: 'ID', width: 120, sortable: true },
  { field: 'name', headerName: 'Employee Name', sortable: true, flex: 1 },
  {
    field: 'gender',
    headerName: 'Gender',
    sortable: true,
    width: 120,
    valueGetter: (params) => {
      const gender = params.data.gender;
      if (gender === 1) return 'Male';
      if (gender === 2) return 'Female';
      return 'Unknown'; 
    },
  },
  { field: 'phoneNumber', headerName: 'Contact', sortable: false, width: 110 },
  { field: 'emailAddress', headerName: 'Email Address', sortable: true, flex: 1 },
  { field: 'cafeName', headerName: 'Assigned Cafe', sortable: true, width: 150 },
  { field: 'daysWorked', headerName: 'Days Worked', sortable: true, width: 150, cellStyle: { textAlign: 'center' } },
  {
    headerName: 'Edit',
    width: 80,
    sortable: false,
    cellStyle: { textAlign: 'center' },
    cellRenderer: (params) => <MdEdit style={{ cursor: 'pointer' }} size={20} color='#1976d2' onClick={() => handleEdit(params.data)} />,
  },
  {
    headerName: 'Delete',
    width: 80,
    sortable: false,
    cellStyle: { textAlign: 'center' },
    cellRenderer: (params) => <MdDelete style={{ cursor: 'pointer' }} size={20} color='#d32f2f' onClick={() => handleDelete(params.data)} />,
  },
];
