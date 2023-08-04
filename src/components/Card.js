import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import CloseButton from "react-bootstrap/CloseButton";

function CustomCard({ card, handleDelete }) {
  return (
    <Card className="p-4 pt-5 position-relative">
      <CloseButton
        onClick={() => handleDelete(card.id)}
        aria-label="Hide"
        className="position-absolute end-0 top-0  p-3  "
      />
      <Card.Img variant="top" className="img-fluid" src={card.image} />
      <Card.Text>{card.text}</Card.Text>
    </Card>
  );
}

export default CustomCard;
