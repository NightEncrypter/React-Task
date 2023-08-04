import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";

import { useEffect, useState } from "react";
import CustomCard from "./components/Card";
function App() {
  const [wishdata, setWishData] = useState(
    JSON.parse(localStorage.getItem("wishData")) || { items: [] }
  );

  const [text, setText] = useState("");

  const imageMapper = new Map();

  imageMapper.set(
    1,
    "https://tse3.mm.bing.net/th?id=OIP.iJgzTFDEd1Cz3zFIOi_VRAHaFj&pid=Api&P=0&h=180"
  );
  imageMapper.set(
    2,
    "https://tse2.mm.bing.net/th?id=OIP._9v6Zq2_BGaUggYD_dz7GQHaFj&pid=Api&P=0&h=180"
  );
  imageMapper.set(
    3,
    "https://tse2.mm.bing.net/th?id=OIP._9v6Zq2_BGaUggYD_dz7GQHaFj&pid=Api&P=0&h=180"
  );
  imageMapper.set(
    4,
    "https://tse4.mm.bing.net/th?id=OIP.8R92c4HinJKCYimPN0YUqgHaDF&pid=Api&P=0&h=180"
  );
  imageMapper.set(
    5,
    "https://tse4.mm.bing.net/th?id=OIP.8R92c4HinJKCYimPN0YUqgHaDF&pid=Api&P=0&h=180"
  );

  const randomFunction = () => {
    return Math.floor(Math.random() * 5) + 1;
  };

  useEffect(() => {
    // console.log(localStorage.getItem("wishData"));
    console.log(wishdata, "wishData");
  }, [wishdata]);
  const handleAddData = () => {
    let items = [];
    if (wishdata?.items?.length > 0) {
      items = [
        ...wishdata.items,
        {
          id: Date.now(),
          image: imageMapper.get(randomFunction()),
          date: new Date(),
        },
      ];
    } else {
      items = [
        {
          id: Date.now(),
          image: imageMapper.get(randomFunction()),
          date: new Date(),
        },
      ];
    }

    const wishDataUpdate = {
      id: Date.now(),
      ...wishdata,
      items: items,
    };
    setWishData(wishDataUpdate);
    localStorage.setItem("wishData", JSON.stringify(wishDataUpdate));

    setText("");
  };

  const handleDesc = () => {
    let items = [];
    if (!text) {
      return;
    }

    items = [
      ...wishdata?.items,
      {
        id: Date.now(),
        text: text,

        date: new Date(),
      },
    ];

    const wishDataUpdate = {
      ...wishdata,
      items: items,
    };
    setWishData(wishDataUpdate);
    localStorage.setItem("wishData", JSON.stringify(wishDataUpdate));

    setText("");
  };

  const handleDelete = (id) => {
    const wishDataUpdate = {
      ...wishdata,
      items: wishdata.items.filter((v) => v.id !== id),
    };

    setWishData(wishDataUpdate);
    localStorage.setItem("wishData", JSON.stringify(wishDataUpdate));
  };

  return (
    <div className="App px-5 pb-5">
      <div className="my-5 d-flex justify-content-end">
        <Button onClick={handleAddData} variant="success">
          Add Image
        </Button>{" "}
      </div>
      {/* <InputGroup>
        <Form.Control as="textarea" aria-label="With textarea" />
      </InputGroup> */}

      <InputGroup className="mb-3">
        <Form.Control
          value={text}
          onChange={(e) => setText(e.currentTarget.value)}
          placeholder="Type your message..."
          as="textarea"
          aria-label="With textarea"
          aria-describedby="basic-addon2"
        />
        <Button
          onClick={handleDesc}
          // variant="outline-secondary"
          color="secondary"
          // id="button-addon2"
        >
          Send
        </Button>
      </InputGroup>
      <ListGroup className="mt-5">
        {wishdata?.items
          ?.sort((a, b) => new Date(a.date) - new Date(b.date))
          .map((l, i) => (
            <CustomCard card={l} key={l.id} handleDelete={handleDelete} />
          ))}
      </ListGroup>
    </div>
  );
}

export default App;
