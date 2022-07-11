import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import data from './data';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/detail';
import axios from 'axios';

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();

  function loadData(res) {
    let newShoes = [...shoes, ...res.data];
    setShoes(newShoes);
  }

  return (
    <div className='App'>
      <Navbar bg='dark' variant='dark'>
        <Container>
          <Navbar.Brand href='#home'>Shoe Mall</Navbar.Brand>
          <Nav className='me-auto'>
            <Nav.Link
              onClick={() => {
                navigate('/');
              }}
              className='nbar'
            >
              Home
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/detail');
              }}
              className='nbar'
            >
              Detail
            </Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route
          path='/'
          element={
            <>
              <div className='main-bg'></div>
              <Container>
                <Row>
                  {shoes.map((shoe, i) => {
                    return <Card i={i} shoe={shoe} key={i} />;
                  })}
                </Row>
              </Container>
              <button
                onClick={() => {
                  axios
                    .get('https://codingapple1.github.io/shop/data2.json')
                    .then((res) => {
                      loadData(res);
                    })
                    .catch((err) => {
                      console.err(err);
                    });
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/about' element={<About />}>
          <Route path='members' element={<div>멤버들</div>} />
          <Route path='location' element={<div>회사위치</div>} />
        </Route>
        <Route path='*' element={<div>없는페이지에요</div>} />
      </Routes>
    </div>
  );
}

function About() {
  return (
    <>
      <div>어바웃페이지</div>
      <Outlet />
    </>
  );
}

function Card(props) {
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
