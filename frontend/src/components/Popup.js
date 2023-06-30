import React, { useEffect } from 'react';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';

const Popup = ({title, context, open, onClose }) => {
  useEffect(() => {
    if (open) {
      const timer = setTimeout(() => {
        onClose();
      }, 4000); // 10 seconds

      return () => {
        clearTimeout(timer);
      };
    }
  }, [open, onClose]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <p>{context}</p>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Close</Button>
      </DialogActions>
    </Dialog>
  );
};

export default Popup;
