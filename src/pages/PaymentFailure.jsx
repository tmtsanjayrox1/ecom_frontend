import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getOrderById } from '../api/orderApi';

function PaymentFailure() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);

  useEffect(() => {
    if (!orderId) return;
    getOrderById(orderId)
      .then((res) => setOrder(res.data))
      .catch((err) => console.error(err));
  }, [orderId]);

  return (
    <div style={{ maxWidth: '480px', margin: '48px auto', textAlign: 'center' }}>
      <div style={{ fontSize: '48px' }}>❌</div>
      <h1>Payment Failed</h1>
      <p>Something went wrong with your payment. You haven't been charged, or your payment is still being processed.</p>

      {order && <p style={{ color: '#888' }}>Order #{order.id} — current status: {order.status}</p>}

      <div style={{ marginTop: '24px', display: 'flex', gap: '16px', justifyContent: 'center' }}>
        <Link to="/cart">Back to Cart</Link>
        <Link to="/">Continue Shopping</Link>
      </div>
    </div>
  );
}

export default PaymentFailure;
