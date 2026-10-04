import { useEffect, useState } from 'react';
import { getCart, updateCartItemQuantity, removeFromCart } from '../api/cartApi';
import { checkout } from '../api/orderApi';
import CartItemRow from '../components/CartItemRow';

function CartPage() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [checkingOut, setCheckingOut] = useState(false);

  const loadCart = () => {
    setLoading(true);
    getCart()
      .then((res) => {
        setCart(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError('Could not load cart.');
        setLoading(false);
      });
  };

  useEffect(() => {
    loadCart();
  }, []);

  const handleUpdateQuantity = async (productId, quantity) => {
    try {
      await updateCartItemQuantity(productId, quantity);
      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromCart(productId);
      loadCart();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCheckout = async () => {
    setCheckingOut(true);
    try {
      const res = await checkout();
      window.location.href = res.data.checkoutUrl;
    } catch (err) {
      console.error(err);
      setError('Checkout failed. Please try again.');
      setCheckingOut(false);
    }
  };

  if (loading) return <p>Loading cart...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  const items = cart?.items || [];
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <div>
      <h1>Your Cart</h1>
      {items.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          {items.map((item) => (
            <CartItemRow key={item.id} item={item} onUpdateQuantity={handleUpdateQuantity} onRemove={handleRemove} />
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '24px', fontSize: '18px' }}>
            <strong>Total</strong>
            <strong>₹{total.toFixed(2)}</strong>
          </div>
          <button onClick={handleCheckout} disabled={checkingOut} style={{ marginTop: '16px', padding: '12px 24px', fontSize: '16px' }}>
            {checkingOut ? 'Placing order...' : 'Proceed to Checkout'}
          </button>
        </>
      )}
    </div>
  );
}

export default CartPage;
