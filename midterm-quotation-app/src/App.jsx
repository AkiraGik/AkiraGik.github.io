import { useState, useRef } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";
import QuotationTable from "./QuotationTable";

const products = [
  { code: "p001", name: "Product A", price: 100 },
  { code: "p002", name: "Product B", price: 200 },
  { code: "p003", name: "Product C", price: 150 },
  { code: "p004", name: "Product D", price: 250 },
];

function App() {
  const itemRef = useRef();
  const ppuRef = useRef();
  const qtyRef = useRef();
  const discountRef = useRef();

  const [dataItems, setDataItems] = useState([]);
  const [ppu, setPpu] = useState(products[0].price);

  const addItem = () => {
    let item = products.find((v) => itemRef.current.value === v.code);

    const qty = parseInt(qtyRef.current.value);
    const discount = parseFloat(discountRef.current.value) || 0;

    // Check if an item with the same name and price already exists
    const existingItemIndex = dataItems.findIndex(
      (v) => v.item === item.name && v.ppu === parseFloat(ppuRef.current.value)
    );

    if (existingItemIndex !== -1) {
      // Item with the same name and price exists, update it
      const updatedItems = [...dataItems];
      const existingItem = updatedItems[existingItemIndex];
      existingItem.qty += qty;
      existingItem.discount += discount;
      existingItem.total = (existingItem.qty * existingItem.ppu - existingItem.discount).toFixed(2);
      setDataItems(updatedItems);
    } else {
      // Add new item
      const totalPrice = ppuRef.current.value * qty;
      const discountedPrice = totalPrice - discount;

      const newItem = {
        item: item.name,
        ppu: parseFloat(ppuRef.current.value),
        qty: qty,
        discount: discount,
        total: discountedPrice.toFixed(2),
      };

      setDataItems([...dataItems, newItem]);
    }
  };

  const clearDataItems = () => {
    setDataItems([]);
  };

  const deleteByIndex = (index) => {
    let newDataItems = [...dataItems];
    newDataItems.splice(index, 1);
    setDataItems(newDataItems);
  };

  const productChange = () => {
    let item = products.find((v) => itemRef.current.value === v.code);
    setPpu(item.price);
  };

  const calculateTotalDiscount = () => {
    return dataItems.reduce((acc, item) => acc + parseFloat(item.discount), 0).toFixed(2);
  };

  return (
    <Container>
      <Row>
        <Col md={4} style={{ backgroundColor: "#e4e4e4" }}>
          <Row>
            <Col>
              Item
              <Form.Select ref={itemRef} onChange={productChange}>
                {products.map((p) => (
                  <option key={p.code} value={p.code}>
                    {p.name}
                  </option>
                ))}
              </Form.Select>
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Price Per Unit</Form.Label>
              <Form.Control
                type="number"
                ref={ppuRef}
                value={ppu}
                onChange={(e) => setPpu(ppuRef.current.value)}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Quantity</Form.Label>
              <Form.Control type="number" ref={qtyRef} defaultValue={1} />
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Label>Discount (Baht)</Form.Label>
              <Form.Control type="number" ref={discountRef} defaultValue={0} />
            </Col>
          </Row>
          <hr />
          <div className="d-grid gap-2">
            <Button variant="primary" onClick={addItem}>
              Add
            </Button>
          </div>
        </Col>
        <Col md={8}>
          <QuotationTable
            data={dataItems}
            clearDataItems={clearDataItems}
            deleteByIndex={deleteByIndex}
          />
          <div style={{ marginTop: "20px", fontWeight: "bold" }}>
            Total Discount: {calculateTotalDiscount()} Baht
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default App;


