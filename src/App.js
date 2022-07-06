import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import data from './data';
import { useState } from 'react';

function App() {
  let [shoes, setShoes] = useState(data);

  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Navbar</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link href='#home'>Home</Nav.Link>
            <Nav.Link href='#features'>Features</Nav.Link>
            <Nav.Link href='#pricing'>Pricing</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <br />
      <div className='main-bg'></div>
      <Container>
        <Row>
          {shoes.map((shoe, i) => {
            return <Shoe i={i} shoe={shoe} />;
          })}
        </Row>
      </Container>
    </div>
  );
}

function Shoe(props) {
  return (
    <Col md={4}>
      <img
        src={
          'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'
        }
      />
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content}</p>
      <p>Price: {props.shoe.price}</p>
    </Col>
  );
}

export default App;
