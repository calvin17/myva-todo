import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DeleteIcon from '@mui/icons-material/Delete';
import EditNoteIcon from '@mui/icons-material/EditNote';
import { useModal } from '../hooks/useModal';

export default function CardActionList({ card, setVisibleActionList }: any) {
  const [open, setOpen] = React.useState(true);
  const { visible, toggleVisibility } = useModal();

  useEffect(() => {
    setOpen(visible);
  }, [visible, setOpen]);

  const openEdit = () => {
    toggleVisibility(card);
    setVisibleActionList(false);
  };

  return (
    <List
      sx={{ width: 150, padding: '0px', bgcolor: '#f5f5f9', color: '#000', fontSize: 10 }}
      component="nav"
      aria-labelledby="card-action"
    >
      <ListItemButton onClick={openEdit}>
        <ListItemIcon sx={{ minWidth: '30px' }}>
          <EditNoteIcon sx={{ color: '#5A6CC3' }} />
        </ListItemIcon>
        <ListItemText primary="Edit Task" />
      </ListItemButton>
      <ListItemButton>
        <ListItemIcon sx={{ minWidth: '30px' }}>
          <DeleteIcon sx={{ color: '#F48685' }} />
        </ListItemIcon>
        <ListItemText primary="Delete Task" />
      </ListItemButton>
    </List>
  );
}
