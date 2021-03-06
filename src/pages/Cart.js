import { Table } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { addCount, minusCount, removeItem } from '../store';

function Cart() {
  let dispatch = useDispatch();

  let cartData = useSelector((state) => state.cartData);

  return (
    <div>
      <Table>
        <tr>
          <th>#</th>
          <th>상품명</th>
          <th>수량</th>
          <th>변경하기</th>
          <th>삭제</th>
        </tr>
        {cartData.map((data, i) => (
          <tr>
            <td>1</td>
            <td>{data.name}</td>
            <td>{data.count}</td>
            <td>
              <button
                onClick={() => {
                  dispatch(addCount(i));
                }}
              >
                +
              </button>
              <button
                onClick={() => {
                  dispatch(minusCount(i));
                }}
              >
                -
              </button>
            </td>
            <td>
              <button
                onClick={() => {
                  dispatch(removeItem(i));
                }}
              >
                X
              </button>
            </td>
          </tr>
        ))}
      </Table>
    </div>
  );
}

export default Cart;
