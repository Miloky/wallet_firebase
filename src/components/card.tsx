import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';

interface MediaCardProps {
  id: string;
  name: string;
  onDelete: (id: string) => Promise<void>
}

const MediaCard = (props: MediaCardProps) => {
  const { id, name, onDelete } = props;
  const navigate = useNavigate();

  const deleteClickHandler: React.MouseEventHandler<HTMLButtonElement> = async (e): Promise<void> => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    await onDelete(id);
  };

  const cardNavigationHandler = (): void => {
    navigate(`/test/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: 'auto',
        marginBottom: '20px',
        cursor: 'pointer',
      }}
      onClick={cardNavigationHandler}
    >
      <CardMedia
        sx={{ height: 140 }}
        image='https://mui.com/static/images/cards/contemplative-reptile.jpg'
        title='green iguana'
      />
      <CardContent>
        <Typography gutterBottom variant='h5' component='div'>
          {name}
        </Typography>
        <Typography variant='body2' color='text.secondary'>
          Lizards are a widespread group of squamate reptiles, with over 6,000
          species, ranging across all continents except Antarctica
        </Typography>
      </CardContent>
      <CardActions>
        <Button size='small' onClick={deleteClickHandler}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
