import React, { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DataTable from './components/DataTable';
import productList from './accessory-products.json';

function App() {
  const productRef = useRef();
  const quantityRef = useRef();

  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);

  const handleSelect = () => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find(p => p.id === pid);
    setPrice(product.price);
  };

  const handleAdd = () => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find(p => p.id === pid);
    const q = quantityRef.current.value;
    setSelectedItems([...selectedItems, { ...product, quantity: q }]);
  };

  return (
    <Container>
      <Row className="my-4">
        <Col xs={12} md={6}>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputProductName">Product Name</Form.Label>
              <Form.Select id="inputProductName" ref={productRef} onChange={handleSelect}>
                {productList.map(product => (
                  <option key={product.id} value={product.id}>
                    {product.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputPrice">Price</Form.Label>
              <Form.Control type="number" id="inputPrice" readOnly value={price} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label htmlFor="inputQuantity">Quantity</Form.Label>
              <Form.Control type="number" id="inputQuantity" defaultValue={1} ref={quantityRef} />
            </Form.Group>
            <Button variant="success" onClick={handleAdd}>
              Add
            </Button>
          </Form>
        </Col>
        <Col xs={12} md={6}>
          <DataTable data={selectedItems} />
        </Col>
      </Row>
    </Container>
  );
}

export default App;
