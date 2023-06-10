import React from 'react';
import { Link } from 'react-router-dom';
// import Switch from 'react-switch';
// import { ThemeContext } from '@emotion/react';
// import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import Button from '@mui/material/Button';

interface TaskBoardProps {
  toggleTheme: () => void;
}

const TaskBoard: React.FC<TaskBoardProps> = ({ toggleTheme }) => {
  return (
    <React.Fragment>
      Task Board
      <Button component={Link} to="new" variant="contained">
        Create New Task
      </Button>
    </React.Fragment>
  );
};

export default TaskBoard;
