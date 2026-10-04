import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../api/cartApi';
import { useAuth } from '../context/AuthContext';

function ProductCard({ product }) {
  const [status, setStatus] = useState('idle');
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate('/login');
      return;
    }
    setStatus('adding');
    try {
      await addToCart(product.id, 1);
      setStatus('added');
      setTimeout(() => setStatus('idle'), 1500);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  return (
    <div style={{ border: '1px solid #ddd', borderRadius: '8px', padding: '16px' }}>
      <h3>{product.name}</h3>
      <p>{product.brand} · {product.ramGb}GB / {product.storageGb}GB · {product.color}</p>
      <p style={{ fontWeight: 'bold' }}>₹{product.price}</p>
      <p>{product.stockQty > 0 ? `${product.stockQty} in stock` : 'Out of stock'}</p>
      <button onClick={handleAddToCart} disabled={product.stockQty === 0 || status === 'adding'}>
        {status === 'adding' ? 'Adding...' : status === 'added' ? 'Added ✓' : 'Add to Cart'}
      </button>
      {status === 'error' && <p style={{ color: 'red' }}>Could not add to cart</p>}
    </div>
  );
}

export default ProductCard;
