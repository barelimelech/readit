import React, { useState } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';

function PopupMessage() {
  const [showPopup, setShowPopup] = useState(true);

  const handleLogin = () => {
    // Perform login logic here
    // Once the login is successful, you can hide the popup
    setShowPopup(false);
  };

  return (
    <div>
      <Dialog open={showPopup} onClose={() => setShowPopup(false)}>
        <DialogTitle>For search, log in first</DialogTitle>
        <DialogContent>
          {/* Place any additional content or form fields here */}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogin}>Login</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PopupMessage;
