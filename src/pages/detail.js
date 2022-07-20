import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { Nav } from 'react-bootstrap';
import { addItem } from '../store';
import { useDispatch } from 'react-redux';

let YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`;

function Detail(props) {
  let dispatch = useDispatch();
  let { id } = useParams();
  let idNum = parseInt(id) + 1;
  let 찾은상품 = props.shoes.find((shoe) => {
    return shoe.id == id;
  });
  let [ival, setIval] = useState('');
  let [tab, setTab] = useState(0);
  let [fade, setFade] = useState('');
  let [fade2, setFade2] = useState('');

  useEffect(() => {
    if (isNaN(ival) == true) {
      alert('숫자만 입력 가능합니다');
    }
  }, [ival]);

  useEffect(() => {
    setTimeout(() => {
      setFade('end');
    }, 100);
    return () => {
      setFade('');
    };
  }, [tab]);

  useEffect(() => {
    setFade2('end');
    return () => {
      setFade2('');
    };
  }, []);

  function onInput(e) {
    setIval(e.target.value);
  }

  return (
    <div className={'container start ' + fade2}>
      <div className='row'>
        <div className='col-md-6'>
          <img
            src={'https://codingapple1.github.io/shop/shoes' + idNum + '.jpg'}
            width='100%'
          />
        </div>
        <div className='col-md-6'>
          <h4 className='pt-5'>{찾은상품.title}</h4>
          <p>{찾은상품.content}</p>
          <p>{찾은상품.price}</p>
          <p>
            주문수량: <input onChange={(e) => onInput(e)} type='text'></input>
            <button
              className='btn btn-danger'
              onClick={() => {
                dispatch(
                  addItem({
                    id: 찾은상품.id,
                    name: 찾은상품.title,
                    count: 찾은상품.count,
                  })
                );
              }}
            >
              주문하기
            </button>
          </p>
          <Nav variant='tabs' defaultActiveKey='link0'>
            <Nav.Item>
              <Nav.Link eventKey='link0' onClick={() => setTab(0)}>
                버튼0
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link1' onClick={() => setTab(1)}>
                버튼1
              </Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey='link2' onClick={() => setTab(2)}>
                버튼2
              </Nav.Link>
            </Nav.Item>
          </Nav>
          {tab == 0 ? <div className={'start ' + fade}>내용0</div> : null}
          {tab == 1 ? <div className={'start ' + fade}>내용1</div> : null}
          {tab == 2 ? <div className={'start ' + fade}>내용2</div> : null}
        </div>
      </div>
    </div>
  );
}

export default Detail;
