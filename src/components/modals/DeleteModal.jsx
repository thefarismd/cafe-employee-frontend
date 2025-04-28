import { Dialog, DialogTitle, DialogContent, DialogActions, Typography, Button } from '@mui/material';

function DeleteModal({ openDeleteDialog, setOpenDeleteDialog, itemToDelete, confirmDelete, itemType = 'item' }) {
  return (
    <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
      <DialogTitle>Confirm Delete</DialogTitle>
      <DialogContent>
        <Typography variant='body1'>Are you sure you want to delete this {itemType}?</Typography>
        <Typography variant='h6' fontWeight='bold'>
          {itemToDelete?.name}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
        <Button variant='contained' color='error' onClick={confirmDelete}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteModal;
