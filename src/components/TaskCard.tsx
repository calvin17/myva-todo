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
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { useModal } from '../hooks/useModal';
import CardActionList from './CardActionList';
import ICard from '../interfaces/ICard';

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const CardContainer = styledEmotion.div`
  padding-bottom: 10px
`;

const StyledTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#f5f5f9',
    color: 'rgba(0, 0, 0, 0.87)',
    width: 150,
    padding: 0,
    fontSize: 10,
    border: '1px solid #dadde9',
  },
}));

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
  // const { visible, toggleVisibility } = useModal();
  const [visibleActionList, setVisibleActionList] = React.useState(false);
  const [backgroundColor, setBackgroundColor] = useState<string>('');

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided) => (
        <CardContainer
          // onClick={() => toggleVisibility(card)}
          // hideCard={card.hidden}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <Card sx={{ width: 200, maxWidth: 345, minHeight: 200, marginBottom: 2, height: "100%", display: "flex", flexDirection: "column", }}>
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500], backgroundColor: '#5A6CC3', width: 32, height: 32 }} aria-label="recipe">
                  C
                </Avatar>
              }
              action={
                <ClickAwayListener onClickAway={() => setVisibleActionList(false)}>
                  <StyledTooltip
                    PopperProps={{
                      disablePortal: true,
                    }}
                    onClose={() => setVisibleActionList(false)}
                    placement="bottom-start"
                    open={visibleActionList}
                    disableFocusListener
                    disableHoverListener
                    disableTouchListener
                    title={<CardActionList card={card} setVisibleActionList={setVisibleActionList} />}
                  >
                    <IconButton onClick={() => setVisibleActionList(!visibleActionList)}>
                      <MoreVertIcon />
                    </IconButton>
                  </StyledTooltip>
                </ClickAwayListener>
              }
              titleTypographyProps={{
                fontSize: 11,
              }}
              subheaderTypographyProps={{
                fontSize: 10,
              }}
              sx={{ paddingBottom: '0px' }}
              title={card.createdBy}
              subheader="Sep 14, 2024"
            />

            <CardContent sx={{ padding: '5px 15px' }}>
              <Typography variant="subtitle2" align="left">{card.title}</Typography>
            </CardContent>
            <CardActions disableSpacing sx={{ mt: "auto" }}>
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
                  borderRadius: 1,
                  height: '25px',
                  color: 'white',
                }}
              />
              {card.description && (
                <ExpandMore
                  expand={expanded}
                  onClick={handleExpandClick}
                  aria-expanded={expanded}
                  aria-label="show more"
                >
                  <ExpandMoreIcon />
                </ExpandMore>
              )}
            </CardActions>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography variant="body2" color="text.secondary">
                  {card.description}
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
