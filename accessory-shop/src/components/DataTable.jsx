import React, { useRef } from 'react';
import { Container, Button } from 'react-bootstrap';

function DataTable({ data, onDelete, onSearch, onSortAscending, onSortDescending }) {
  const sRef = useRef();

  const handleSearch = () => {
    const keyword = sRef.current.value;
    onSearch(keyword);
  };

  return (
    <Container className="data-table-container">
      <div className="search-container" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <input type="text" placeholder="Search..." ref={sRef} className="search-input" />
        <Button onClick={handleSearch} className="btn btn-primary search-button">
          <i className="bi bi-search"></i> Search
        </Button>
      </div>
      <div className="sort-container" style={{ marginBottom: '10px', display: 'flex', alignItems: 'center' }}>
        <span className="sort-label" style={{ marginRight: '10px' }}>Sort</span>
        <Button onClick={onSortAscending} className="btn btn-light sort-button">
          <i className="bi bi-arrow-up"></i>
        </Button>
        <Button onClick={onSortDescending} className="btn btn-light sort-button">
          <i className="bi bi-arrow-down"></i>
        </Button>
      </div>
      <table className="table">
        <thead>
          <tr>
            <th className="name-column">Name</th>
            <th className="price-column">Price</th>
            <th className="quantity-column">Quantity</th>
            <th className="action-column">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td className="name-column">{item.name}</td>
              <td className="price-column">{item.price}</td>
              <td className="quantity-column">{item.quantity}</td>
              <td className="action-column">
                <button onClick={() => onDelete(index)} className="btn btn-danger">
                  <i className="bi bi-trash-fill"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}

export default DataTable;









