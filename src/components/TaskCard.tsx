import React, { useContext, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import Chip from '@mui/material/Chip';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import PersonAddAlt1Icon from '@mui/icons-material/PersonAddAlt1';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { Draggable } from 'react-beautiful-dnd';
import styledEmotion from '@emotion/styled';

import { useModal } from '../hooks/useModal';
import ICard from '../interfaces/ICard';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const CardContainer = styledEmotion.div`
  padding-bottom: 10px
`;

const ExpandMore = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
  marginLeft: 'auto',
  transition: theme.transitions.create('transform', {
    duration: theme.transitions.duration.shortest,
  }),
}));

interface CardProps {
  card: ICard;
  index: number;
}

interface StringMap {
  [key: string]: string;
}

const chipCategory = (category: string): any => {
  const categoryColor: StringMap = {
    home: '#BBDD93',
    work: '#F48685',
    learning: '#7BC0F9',
    kid: '#4CCBD4',
    others: '#F4984B',
  };
  return categoryColor[category];
};

const TaskCard: React.FC<CardProps> = ({ card, index }) => {
  const [expanded, setExpanded] = React.useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const { toggleVisibility } = useModal();
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <CardContainer
          onClick={() => toggleVisibility(card)}
          // hideCard={card.hidden}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card sx={{ maxWidth: 345, marginBottom: 2 }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500], backgroundColor: '#5A6CC3' }} aria-label="recipe">
                  C
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              subheaderTypographyProps={{
                fontSize: 11,
              }}
              sx={{ paddingBottom: '0px' }}
              title="Calvin Abraham"
              subheader="September 14, 2016"
            />
            <CardContent>
              <Typography paragraph>{card.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                This impressive paella is a perfect party dish and a fun meal to cook together with your
                guests. Add 1 cup of frozen peas along with the mussels, if you like.
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <IconButton aria-label="add to users">
                <PersonAddAlt1Icon fontSize="small" />
              </IconButton>
              <IconButton aria-label="share">
                <ShareIcon fontSize="small" />
              </IconButton>
              <Chip
                label={`${card.category}`}
                sx={{
                  width: '75px',
                  marginLeft: '10px',
                  bgcolor: `${chipCategory(card.category)}`,
                  color: 'white',
                }}
              />
              <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore>
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography paragraph>Method:</Typography>
                <Typography paragraph>
                  Heat 1/2 cup of the broth in a pot until simmering, add saffron and set aside for 10
                  minutes.
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        </CardContainer>
      )}
    </Draggable>
  );
};

export default TaskCard;
