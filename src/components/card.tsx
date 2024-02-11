import * as React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const numberWithSpaces = (x: string | number): string => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  return parts.join(".");
};

const imgPlaceholder =
  "https://i.pinimg.com/736x/90/19/4b/90194b7f2ca68a3d80dc41a6e20ae1de.jpg";

interface MediaCardProps {
  id: string;
  name: string;
  balance: string;
  logo: string;
  currencyCode: string;
  onDelete: (id: string) => Promise<void>;
}

const MediaCard = (props: MediaCardProps) => {
  const { id, name, balance, logo, currencyCode, onDelete } = props;
  const navigate = useNavigate();

  const deleteClickHandler: React.MouseEventHandler<HTMLButtonElement> = async (
    e
  ): Promise<void> => {
    e.nativeEvent.stopImmediatePropagation();
    e.stopPropagation();
    await onDelete(id);
  };

  const cardNavigationHandler = (): void => {
    navigate(`/accounts/${id}`);
  };

  return (
    <Card
      sx={{
        maxWidth: 350,
        margin: "auto",
        marginBottom: "20px",
        cursor: "pointer",
      }}
      onClick={cardNavigationHandler}
    >
      <CardMedia
        sx={{ height: 140, backgroundSize: "contain" }}
        image={logo ?? imgPlaceholder}
        title="Logo"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {numberWithSpaces(balance)} {currencyCode}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {name}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={deleteClickHandler}>
          Delete
        </Button>
      </CardActions>
    </Card>
  );
};

export default MediaCard;
