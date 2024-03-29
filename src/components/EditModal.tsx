import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useModal } from '../hooks/useModal';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '1px solid #5A6CC3',
  boxShadow: 24,
  p: 4,
};

export default function EditModal() {
  const { visible, toggleVisibility, selectedCard } = useModal();
  const handleClose = () => {
    toggleVisibility(selectedCard);
  };

  return (
    <Modal
      aria-labelledby="transition-modal-title"
      aria-describedby="transition-modal-description"
      open={visible}
      onClose={handleClose}
      closeAfterTransition
      disableAutoFocus={true}
      slots={{ backdrop: Backdrop }}
      slotProps={{
        backdrop: {
          timeout: 500,
        },
      }}
    >
      <Fade in={visible}>
        <Box sx={style}>
          <Typography id="transition-modal-title" variant="h6" component="h2">
            {selectedCard?.title}
          </Typography>
          <Typography id="transition-modal-description" sx={{ mt: 2 }}>
            {selectedCard?.description}
          </Typography>
        </Box>
      </Fade>
    </Modal>
  );
}
