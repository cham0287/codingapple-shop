import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

let YellowBtn = styled.button`
  background: yellow;
  color: black;
  padding: 10px;
`;

function Detail(props) {
  let { id } = useParams();
  let idNum = parseInt(id) + 1;
  let 찾은상품 = props.shoes.find((shoe) => {
    return shoe.id == id;
  });
  let [ival, setIval] = useState('');

  useEffect(() => {
    if (isNaN(ival) == true) {
      alert('숫자만 입력 가능합니다');
    }
  }, [ival]);

  function onInput(e) {
    setIval(e.target.value);
  }

  return (
    <div className='container'>
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
            <button className='btn btn-danger'>주문하기</button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Detail;
