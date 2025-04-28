import { MdEdit, MdDelete } from 'react-icons/md';

export const cafesColumns = (handleEdit, handleDelete) => [
  { field: 'id', headerName: 'ID', width: 320, sortable: true },
  {
    field: 'logoUrl',
    headerName: 'Logo',
    width: 70,
    sortable: false,
    cellRenderer: (params) =>
      params.value ? (
        <img
          src={params.value}
          alt='Logo'
          style={{
            width: 50,
            height: 50,
            objectFit: 'cover',
            borderRadius: '8px',
          }}
        />
      ) : (
        ''
      ),
  },
  { field: 'name', headerName: 'Cafe Name', sortable: true },
  { field: 'location', headerName: 'Location', sortable: true },
  { field: 'description', headerName: 'Description', flex: 1, sortable: false },
  { field: 'totalEmployees', headerName: 'No. of Employees', sortable: true, width: 180, cellStyle: { textAlign: 'center' } },
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
