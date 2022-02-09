import axios from "axios";
import {
  Card,
  Accordion,
  Button,
  Container,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { useState, useEffect, useReducer } from "react";

const products = [
  { name: "Apples", country: "Italy", cost: 3, instock: 10, id: 1 },
  { name: "Oranges", country: "Spain", cost: 4, instock: 3, id: 2 },
  { name: "Beans", country: "USA", cost: 2, instock: 5, id: 3 },
  { name: "Cabbage", country: "USA", cost: 1, instock: 8, id: 4 },
];
//=========Cart=============
const Cart = (props) => {
  let data = props.location.data ? props.location.data : products;
  // console.log(` cart data:${JSON.stringify(data)}`);

  return <Accordion defaultActiveKey="0">{props.list}</Accordion>;
};

const useDataApi = (initialUrl, initialData) => {
  const [url, setUrl] = useState(initialUrl);

  const [state, dispatch] = useReducer(dataFetchReducer, {
    isLoading: false,
    isError: false,
    data: initialData,
  });
  console.log(`useDataApi called`);
  useEffect(() => {
    console.log("useEffect Called");
    let didCancel = false;
    const fetchData = async () => {
      dispatch({ type: "FETCH_INIT" });
      try {
        const result = await axios.get(url)
        console.log("FETCH FROM URl");
        if (!didCancel) {
          dispatch({ type: "FETCH_SUCCESS", payload: result.data });
        }
      } catch (error) {
        if (!didCancel) {
          dispatch({ type: "FETCH_FAILURE" });
        }
      }
    };
    fetchData();
    return () => {
      didCancel = true;
    };
  }, [url]);
  return [state, setUrl];
};
const dataFetchReducer = (state, action) => {
  switch (action.type) {
    case "FETCH_INIT":
      return {
        ...state,
        isLoading: true,
        isError: false,
      };
    case "FETCH_SUCCESS":
      return {
        ...state,
        isLoading: false,
        isError: false,
        data: action.payload,
      };
    case "FETCH_FAILURE":
      return {
        ...state,
        isLoading: false,
        isError: true,
      };
    default:
      throw new Error();
  }
};

const Products = (props) => {
  const [items, setItems] = useState(products);
  const [cart, setCart] = useState([]);
  // const [total, setTotal] = React.useState(0);

  //  Fetch Data
  const [query, setQuery] = useState("http://localhost:1337/api/products");
  const [{ data, isLoading, isError }, doFetch] = useDataApi(
    "http://localhost:1337/api/products",
    {
      data: [],
    }
  );
  // console.log(`Rendering Products ${JSON.stringify(data.data)}`);
  // Fetch Data
  const addToCart = (e) => {
    let name = e.target.name;
    let id = e.target.id;
    let item = items.filter((item) => item.name == name && item.id == id);
    if (item[0].instock == 0) return;
    item[0].instock = item[0].instock - 1;
    // console.log(`add to Cart ${JSON.stringify(item)}`);
    setCart([...cart, ...item]);
  };

  const deleteCartItem = (index) => {
    let newCart = cart.filter((item, i) => index !== i);
    let deletedItem = cart.filter((item, i) => index === i);
    deletedItem[0].instock += 1;
    setCart(newCart);
  };
  // const photos = ["apple.png", "orange.png", "beans.png", "cabbage.png"];

  let list = items.map((item, index) => {
    let n = index + 37;
    let url = "https://picsum.photos/id/" + n + "/50/50";

    return (
      <li key={index}>
        <Image src={url} width={70} roundedCircle></Image>
        <Button variant="primary" size="large">
          {item.name}:${item.cost}
          <br />
          Stock={item.instock}
        </Button>
        <Button
          variant="success"
          name={item.name}
          id={item.id}
          onClick={addToCart}
        >
          Add To Cart
        </Button>
      </li>
    );
  });

  let cartList = cart.map((item, index) => {
    return (
      <Card key={index}>
        {/* <Card.Header>
          <Accordion.Item as={Button} variant="link" eventKey="0">
            <Accordion.Header>{item.name}</Accordion.Header>
            <Accordion.Body onClick={() => deleteCartItem(index)}>
              {" "}
              <Card.Body>
                <h3>
                  $ {item.cost} from {item.country}
                </h3>
                <p>click to delete</p>
              </Card.Body>
            </Accordion.Body>
          </Accordion.Item>
        </Card.Header> */}
        <Accordion.Item eventKey={1 + index}>
          <Accordion.Header>{item.name}</Accordion.Header>
          <Accordion.Body onClick={() => deleteCartItem(index)}>
            <h3>
              $ {item.cost} from {item.country}
            </h3>
            <p>click to delete</p>
          </Accordion.Body>
        </Accordion.Item>
      </Card>
    );
  });

  let finalList = () => {
    let total = checkOut();
    let final = cart.map((item, index) => {
      return (
        <div key={index} index={index}>
          {item.name}
        </div>
      );
    });
    return { final, total };
  };

  const checkOut = () => {
    let costs = cart.map((item) => item.cost);
    const reducer = (accum, current) => accum + current;
    let newTotal = costs.reduce(reducer, 0);
    // console.log(`total updated to ${newTotal}`);
    return newTotal;
  };
  // TODO: implement the restockProducts function
  const restockProducts = (url) => {
    console.log("url is:" + url);
    doFetch(url);
    console.log(data.data);

    let newItems = data.data.map((item) => {
      let name = item.attributes.name;
      let country = item.attributes.country;
      let cost = item.attributes.cost;
      let instock = item.attributes.instock;
      let id = Math.floor(Math.random() * 1000) + item.id;
      console.log(name, country, cost, instock, id);

      return { name, country, cost, instock, id };
    });
    // if name = a name in items, don't make a new button, just add instock
    // let matchingItems = items.filter(item => item.name === newItems.name)

    // if(matchingItems.length > 0){
    //   return items.map(item => item.instock += newItems.instock)
    // } else
    setItems([...items, ...newItems]);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Product List</h1>
          <ul style={{ listStyleType: "none" }}>{list}</ul>
        </Col>
        <Col>
          <h1>Cart Contents</h1>
          <p>Click product name to open and delete</p>
          <Accordion>{cartList}</Accordion>
        </Col>
        <Col>
          <h1>CheckOut </h1>
          <Button onClick={checkOut}>CheckOut $ {finalList().total}</Button>
          <div> {finalList().total > 0 && finalList().final} </div>
        </Col>
      </Row>
      <Row>
        <form
          onSubmit={(event) => {
            restockProducts(`${query}`);
            console.log(`Restock called on ${query}`);
            event.preventDefault();
            console.log(items);
          }}
        >
          <input
            type="text"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
          />
          <button type="submit">ReStock Products</button>
        </form>
      </Row>
    </Container>
  );
};

export default Products ;
