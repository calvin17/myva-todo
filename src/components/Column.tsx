import React from 'react';
import { Paper, Box, Grid, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';
import IStatus from '../interfaces/IStatus';
import ICard from '../interfaces/ICard';

interface ColumnProps {
  status: IStatus;
  cards: ICard[];
  index: number;
}

const Item = styled(Box)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  textAlign: 'center',
  height: '70vh',
  color: theme.palette.text.secondary,
}));

const Column: React.FC<ColumnProps> = ({ status, cards, index }) => {
  return (
    <React.Fragment>
      <Grid item lg={2} md={12}>
        <Typography variant="h6" component="h6" sx={{ fontWeight: 'bold', marginBottom: '10px' }}>
          {status}
        </Typography>
        <Droppable droppableId={status}>
          {(provided) => (
            <Item ref={provided.innerRef} {...provided.droppableProps}>
              {cards
                .filter((card) => card.status === status)
                .map((card, index) => (
                  <TaskCard key={card.id} card={card} index={index} />
                ))}
              {provided.placeholder}
            </Item>
          )}
        </Droppable>
      </Grid>
    </React.Fragment>
  );
};

export default Column;
