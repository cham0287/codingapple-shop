import './App.css';
import { Navbar, Container, Nav, Row, Col } from 'react-bootstrap';
import data from './data';
import { useEffect, useState } from 'react';
import { Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import Detail from './pages/Detail';
import axios from 'axios';
import Cart from './pages/Cart';

function App() {
  useEffect(() => {
    localStorage.setItem('watched', JSON.stringify([]));
  }, []);
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
            <Nav.Link
              onClick={() => {
                navigate('/cart');
              }}
              className='nbar'
            >
              Cart
            </Nav.Link>
            <Nav.Link
              onClick={() => {
                navigate('/about');
              }}
              className='nbar'
            >
              About
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
                    setLoadState(true); //기본 상태를 false로 두고 클릭하면 로딩중을 보여주다가
                    setTimeout(() => {
                      axios
                        .get('https://codingapple1.github.io/shop/data2.json')
                        .then((res) => {
                          loadData(res);
                          setLoadState(false); //get작업이 완료되면 로딩중을 다시 false로 바꿔서 안보이게함
                        })
                        .catch((err) => {
                          console.err(err);
                          setLoadState(false); //get요청이 실패해서 catch로 갈 때도 처리해줘야됨
                        });
                    }, 1000); //로딩시간이 너무 짧아서 settimeout을 1초를 일부러 만들어주었다
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
                          setLoadState(false);
                        });
                    }, 1000);
                  }
                  if (clickCount > 1) {
                    setNomore(true);
                  }
                  setClickCount((prevCount) => prevCount + 1); //클릭할때마다 클릭수를 state에 저장해서 누를때마다 다른 곳에서 요청을 받아오고
                  //3번이상 클릭했을 때에는 더 불러올 상품이 없습니다 라는 내용을 보여주도록 설정함
                }}
              >
                더보기
              </button>
            </>
          }
        />
        <Route path='/detail/:id' element={<Detail shoes={shoes} />} />
        <Route path='/cart' element={<Cart />} />
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
  let navigate = useNavigate();
  return (
    <>
      <div>어바웃페이지</div>
      <Nav.Link
        onClick={() => {
          navigate('/about/members');
        }}
        className='nbar'
      >
        members
      </Nav.Link>
      <Nav.Link
        onClick={() => {
          navigate('/about/location');
        }}
        className='nbar'
      >
        location
      </Nav.Link>
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
