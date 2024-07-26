import React, { useState, useRef, useEffect } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import DataTable from './components/DataTable';
import productList from './accessory-products.json';

function App() {
  const productRef = useRef();
  const quantityRef = useRef();

  const [price, setPrice] = useState(productList[0].price);
  const [selectedItems, setSelectedItems] = useState([]);
  const [filteredSelectedItems, setFilteredSelectedItems] = useState([]);

  useEffect(() => {
    setFilteredSelectedItems(selectedItems);
  }, [selectedItems]);

  const handleSelect = () => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find(p => p.id === pid);
    setPrice(product.price);
  };

  const handleAdd = () => {
    const pid = parseInt(productRef.current.value);
    const product = productList.find(p => p.id === pid);
    const q = quantityRef.current.value;
    const newItems = [...selectedItems, { ...product, quantity: q }];
    setSelectedItems(newItems);
    setFilteredSelectedItems(newItems);
  };

  const deleteItemByIndex = (index) => {
    const newItems = selectedItems.filter((_, i) => i !== index);
    setSelectedItems(newItems);
    setFilteredSelectedItems(newItems);
  };

  const search = (keyword) => {
    setFilteredSelectedItems(
      selectedItems.filter(item =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      )
    );
  };

  const sortAscending = () => {
    const sortedItems = [...filteredSelectedItems].sort((a, b) => a.name.localeCompare(b.name));
    setFilteredSelectedItems(sortedItems);
  };

  const sortDescending = () => {
    const sortedItems = [...filteredSelectedItems].sort((a, b) => b.name.localeCompare(a.name));
    setFilteredSelectedItems(sortedItems);
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
          <DataTable
            data={filteredSelectedItems}
            onDelete={deleteItemByIndex}
            onSearch={search}
            onSortAscending={sortAscending}
            onSortDescending={sortDescending}
          />
        </Col>
      </Row>
    </Container>
  );
}

export default App;


