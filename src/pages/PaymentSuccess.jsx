import { useEffect, useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { getOrderById } from '../api/orderApi';

function PaymentSuccess() {
  const [searchParams] = useSearchParams();
  const orderId = searchParams.get('orderId');
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!orderId) {
      setError('No order specified.');
      setLoading(false);
      return;
    }
    getOrderById(orderId)
      .then((res) => {
        setOrder(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load order details.');
        setLoading(false);
      });
  }, [orderId]);

  if (loading) return <p>Loading...</p>;

  return (
    <div style={{ maxWidth: '480px', margin: '48px auto', textAlign: 'center' }}>
      <div style={{ fontSize: '48px' }}>✅</div>
      <h1>Payment Successful</h1>
      <p>Thank you! Your order has been confirmed.</p>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {order && (
        <div style={{ textAlign: 'left', border: '1px solid #ddd', borderRadius: '8px', padding: '16px', marginTop: '24px' }}>
          <p><strong>Order #{order.id}</strong></p>
          <p>Status: {order.status}</p>
          <p>Total: ₹{order.totalAmount}</p>
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>{item.product.name} × {item.quantity}</li>
            ))}
          </ul>
        </div>
      )}

      <Link to="/" style={{ display: 'inline-block', marginTop: '24px' }}>Continue Shopping</Link>
    </div>
  );
}

export default PaymentSuccess;
