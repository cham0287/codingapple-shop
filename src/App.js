import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import data from './data';
import { useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/detail';
import axios from 'axios';
import { click } from '@testing-library/user-event/dist/click';

function App() {
  let [shoes, setShoes] = useState(data);
  let navigate = useNavigate();
  let [clickCount, setClickCount] = useState(0);
  let [loadState, setLoadState] = useState(false);
  let [noMore, setNomore] = useState(false);

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
                    return (
                      <>
                        <Card i={i} shoe={shoe} key={i} />
                      </>
                    );
                  })}
                  {loadState == true ? <Loading /> : null}
                  {noMore == true ? <NoMore /> : null}
                </Row>
              </Container>
              <button
                onClick={() => {
                  if (clickCount == 0) {
                    setLoadState(true);
                    setTimeout(() => {
                      axios
                        .get('https://codingapple1.github.io/shop/data2.json')
                        .then((res) => {
                          loadData(res);
                          setLoadState(false);
                        })
                        .catch((err) => {
                          console.err(err);
                        });
                    }, 1000);
                  }
                  if (clickCount == 1) {
                    setLoadState(true);
                    setTimeout(() => {
                      axios
                        .get('https://codingapple1.github.io/shop/data3.json')
                        .then((res) => {
                          loadData(res);
                          setLoadState(false);
                        })
                        .catch((err) => {
                          console.err(err);
                        });
                    }, 1000);
                  }
                  if (clickCount > 1) {
                    setNomore(true);
                  }
                  setClickCount((prevCount) => prevCount + 1);
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
function Loading() {
  return (
    <>
      <div>로딩중입니다</div>
    </>
  );
}
function NoMore() {
  return (
    <>
      <div>더이상 불러올 페이지가 없습니다</div>
    </>
  );
}

function Card(props) {
  let navigate = useNavigate();

  return (
    <Col md={4}>
      <Nav.Link
        onClick={() => {
          navigate('/detail/' + props.i);
        }}
      >
        <img
          src={
            'https://codingapple1.github.io/shop/shoes' + (props.i + 1) + '.jpg'
          }
        />
      </Nav.Link>
      <h4>{props.shoe.title}</h4>
      <p>{props.shoe.content}</p>
      <p>Price: {props.shoe.price}</p>
    </Col>
  );
}

export default App;
