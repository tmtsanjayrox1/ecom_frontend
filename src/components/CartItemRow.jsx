function CartItemRow({ item, onUpdateQuantity, onRemove }) {
  const { product, quantity } = item;
  const lineTotal = (product.price * quantity).toFixed(2);

  return (
    <div style={styles.row}>
      <div style={styles.info}>
        <strong>{product.name}</strong>
        <span> · {product.brand}</span>
      </div>
      <div style={styles.controls}>
        <button onClick={() => onUpdateQuantity(product.id, quantity - 1)}>-</button>
        <span style={{ margin: '0 8px' }}>{quantity}</span>
        <button onClick={() => onUpdateQuantity(product.id, quantity + 1)}>+</button>
      </div>
      <div style={styles.price}>₹{lineTotal}</div>
      <button onClick={() => onRemove(product.id)} style={styles.remove}>Remove</button>
    </div>
  );
}

const styles = {
  row: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #eee', gap: '16px' },
  info: { flex: 2 },
  controls: { flex: 1, display: 'flex', alignItems: 'center' },
  price: { flex: 1, fontWeight: 'bold', textAlign: 'right' },
  remove: { background: 'none', border: 'none', color: '#c00', cursor: 'pointer' },
};

export default CartItemRow;
