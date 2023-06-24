import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Switch from 'react-switch';
import { ThemeContext } from '@emotion/react';
import { DragDropContext, DropResult } from 'react-beautiful-dnd';
import {
  Container,
  Box,
  Paper,
  Grid,
  Typography,
  TextField,
  IconButton,
  InputAdornment,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import styledEmotion from '@emotion/styled';
import Button from '@mui/material/Button';
import SearchIcon from '@mui/icons-material/Search';
import Checkbox, { checkboxClasses } from '@mui/material/Checkbox';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

import { useModal } from '../hooks/useModal';
import { useAppDispatch, useAppSelector } from '../hooks/useRedux';
import ICategory from '../interfaces/ICategory';
import IStatus from '../interfaces/IStatus';
import ICard from '../interfaces/ICard';
import IColumn from '../interfaces/IColumn';
import { setColumns } from '../store/slices/columns.slice';
import { filterCards, setCards } from '../store/slices/cards.slice';
import Column from './Column';
import EditModal from './EditModal';

import CreateTask from './CreateTask';

interface TaskBoardProps {
  toggleTheme: () => void;
}

interface TaskBoard {
  toggleTheme: () => void;
}

const StyledFormControlLabel = styledEmotion(FormControlLabel)`
  padding: 1px;
  font-size: 24px;
  border-radius: 5px;
  color: white;
  font-weight: bold;
  height: 30px;
  width: 115px;
  margin: 3px;
  &:hover {
    color: white;
  }
  span {
    font-size: 15px;
  }
`;

const StyledCheckbox = styledEmotion(Checkbox)`
  color: white;
`;

const FilterCategory = styledEmotion(Box)`
  margin: 5px 0px;
`;

const StatusesColumnsContainer = styledEmotion(Grid)`
  margin: 10px 0px;
`;

function SearchTextField() {
  return (
    <Box
      sx={{
        width: 300,
        maxWidth: '100%',
      }}
    >
      <TextField
        fullWidth
        label="Search for title"
        id="fullWidth"
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}

const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const TaskBoard: React.FC<TaskBoardProps> = ({ toggleTheme }) => {
  const [searched, setSearched] = useState('');
  const theme = useContext(ThemeContext);

  const [openCreateModal, SetOpenCreateModal] = useState(false);

  const { cards } = useAppSelector((state: { cards: any }) => state.cards);
  const { columns } = useAppSelector((state) => state.columns);
  const { visible } = useModal();

  const [selectedCategories, setSelectedCategories] = useState<ICategory[]>(Object.values(ICategory));

  const dispatch = useAppDispatch();

  const onDragEnd = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (destination.droppableId === source.droppableId && destination.index === source.index) return;

    const updatedCards: ICard[] = cards.map((card: { id: string }) => {
      if (card.id === draggableId) {
        const status: IStatus = destination.droppableId as IStatus;

        return {
          ...card,
          status,
        };
      } else return card;
    });

    const sourceColumn: IColumn = columns.find((column) => column.id === source.droppableId) as IColumn;
    const destinationColumn: IColumn = columns.find(
      (column) => column.id === destination.droppableId
    ) as IColumn;

    //Moving cards in the same column
    if (sourceColumn === destinationColumn) {
      const newColumnCardIds = [...destinationColumn.cardsIds];

      newColumnCardIds.splice(source.index, 1);
      newColumnCardIds.splice(destination.index, 0, draggableId);

      const newDestinationColumn: IColumn = {
        ...destinationColumn,
        cardsIds: newColumnCardIds,
      };

      const updatedColumns: IColumn[] = columns.map((column) => {
        if (column.id === newDestinationColumn.id) return newDestinationColumn;
        else return column;
      });

      dispatch(setColumns(updatedColumns));
      dispatch(setCards(updatedCards));

      return;
    }

    // Moving cards from one column to another

    const sourceCardsIds = [...sourceColumn.cardsIds];
    sourceCardsIds.splice(source.index, 1);

    const newSourceColumn: IColumn = {
      ...sourceColumn,
      cardsIds: sourceCardsIds,
    };

    const destinationCardsIds = [...destinationColumn.cardsIds];
    destinationCardsIds.splice(destination.index, 0, draggableId);

    const newDestinationColumn: IColumn = {
      ...destinationColumn,
      cardsIds: destinationCardsIds,
    };

    const updatedColumns: IColumn[] = columns.map((column) => {
      if (column.id === newDestinationColumn.id) return newDestinationColumn;
      if (column.id === newSourceColumn.id) return newSourceColumn;
      else return column;
    });

    dispatch(setColumns(updatedColumns));
    dispatch(setCards(updatedCards));
  };

  const handleChangeCheckbox = (category: ICategory) => {
    const foundCategory = selectedCategories.find((item) => item === category);

    if (foundCategory) {
      const categoriesWithItemRemoved = selectedCategories.filter((item) => item !== category);
      setSelectedCategories(categoriesWithItemRemoved);
      return;
    }

    setSelectedCategories([...selectedCategories, category]);
  };

  useEffect(() => {
    dispatch(filterCards({ categories: selectedCategories }));
  }, [selectedCategories]);

  return (
    <React.Fragment>
      {/* <Button component={Link} to="new" variant="contained"></Button> */}
      <Container maxWidth={false}>
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={2} justifyContent="center" mt={2} mb={4}>
            <Grid item lg={4} md={12}>
              <Typography variant="h5" component="h5" sx={{ fontWeight: 'bold' }}>
                Task Manager
              </Typography>
              <Button
                onClick={() => SetOpenCreateModal(true)}
                variant="contained"
                endIcon={<AddCircleOutlineIcon />}
                sx={{ marginTop: '20px' }}
              >
                Create New
              </Button>
            </Grid>
            <Grid item lg={6} md={12}>
              <Box display="flex" justifyContent="flex-end">
                <SearchTextField />
              </Box>
              <FilterCategory display="flex" justifyContent="flex-end">
                <FormControl component="fieldset">
                  <FormGroup aria-label="position" row>
                    <StyledFormControlLabel
                      value="end"
                      control={<StyledCheckbox defaultChecked color="default" />}
                      label="Home"
                      sx={{
                        backgroundColor: '#BBDD93',
                      }}
                    />
                    <StyledFormControlLabel
                      value="end"
                      control={<StyledCheckbox defaultChecked color="default" />}
                      label="Work"
                      sx={{
                        backgroundColor: '#F48685',
                      }}
                    />
                    <StyledFormControlLabel
                      value="end"
                      control={<StyledCheckbox defaultChecked color="default" />}
                      label="Learning"
                      sx={{
                        backgroundColor: '#7BC0F9',
                      }}
                    />
                    <StyledFormControlLabel
                      value="end"
                      control={<StyledCheckbox defaultChecked color="default" />}
                      label="Kid"
                      sx={{
                        backgroundColor: '#4CCBD4',
                      }}
                    />
                    <StyledFormControlLabel
                      value="end"
                      control={<StyledCheckbox defaultChecked color="default" />}
                      label="Others"
                      sx={{
                        backgroundColor: '#F4984B',
                      }}
                    />
                  </FormGroup>
                </FormControl>
              </FilterCategory>
            </Grid>
          </Grid>
          <StatusesColumnsContainer container spacing={3} justifyContent="center">
            <DragDropContext onDragEnd={onDragEnd}>
              {columns.map((column, index) => {
                const cardsArray: ICard[] = [];

                column.cardsIds.forEach((cardId) => {
                  const foundedCard = cards.find((card: any) => card.id === cardId);
                  if (foundedCard) cardsArray.push(foundedCard);
                });

                return <Column key={column.id} index={index} status={column.id} cards={cardsArray} />;
              })}
            </DragDropContext>
          </StatusesColumnsContainer>
        </Box>
      </Container>
      <EditModal />
      <CreateTask visible={openCreateModal} handleClose={() => SetOpenCreateModal(false)} />
    </React.Fragment>
  );
};

export default TaskBoard;
