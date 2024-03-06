import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import { numberWithSpaces } from '../helpers/number-with-spaces';

const imgPlaceholder =
  "https://i.pinimg.com/736x/90/19/4b/90194b7f2ca68a3d80dc41a6e20ae1de.jpg";

interface MediaCardProps {
  id: string;
  name: string;
  balance: string;
  logo: string;
  currencyCode: string;
}

const MediaCard = (props: MediaCardProps) => {
  const { id, name, balance, logo, currencyCode } = props;
  const navigate = useNavigate();

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
    </Card>
  );
};

export default MediaCard;
