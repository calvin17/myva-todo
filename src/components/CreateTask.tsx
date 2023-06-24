import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

import NewTask from './NewTask';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  border: '1px solid #5A6CC3',
  boxShadow: 24,
  p: 4,
};

export default function CreateTask({ visible, handleClose }: any) {
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
          <NewTask />
        </Box>
      </Fade>
    </Modal>
  );
}
