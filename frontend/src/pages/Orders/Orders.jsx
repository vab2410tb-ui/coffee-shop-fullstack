import { useEffect, useState } from 'react';
import { Await, useParams } from 'react-router-dom'
import order from './order.module.scss'
import orderService from '../../service/orderService';

const OrderPage = () => {
  const [products, setProducts] = useState('');
  const {userId} = useParams();

  useEffect(() => {
    const fetchOrderUser = async (userId) => {
      try {

        const authentication = localStorage.getItem('userInfo');

        if(!authentication)
          return;

        const response = await orderService.getUserOrders(userId)

        if( response.success)
          setProducts(response.data);
      } catch(error) {
        console.error();
      }
    }

    fetchOrderUser();
  }, [userId])

console.log(setProducts)
  return (
    <div>
    </div>
  );
}

export default OrderPage;