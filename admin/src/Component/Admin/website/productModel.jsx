import React from 'react';
import Modal from 'react-modal';

const ProductModal = ({ isOpen, onRequestClose, products }) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Product Details"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        },
        content: {
          width: '650px',
          height: '450px',
          margin: 'auto',
          padding: '25px',
          borderRadius: '10px',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          backgroundColor: 'white',
        },
      }}
    >
      <h2 style={{ marginBottom: '20px', fontSize: '20px', color: '#333', fontWeight: 'bold' }}>Product Details</h2>
        {products.map((product) => (
            <div key={product.product.product_name} style={{ marginBottom: '10px', padding: '8px',border: '1px solid #ddd', borderRadius: '5px' }}>
                 <img src={product.product.img_url} alt={product.product.product_name} style={{ width: '180x', height: '140px', marginBottom: "5px", display: "inline"  }} />
                <span style={{ margin: '0', color: '#555', }}>{`${product.product.product_name} - `}</span>
                <span style={{ margin: '0', color: '#555', fontWeight: 'bold',borderBottom: '2px solid #1E3A8A' }}>{`count (${product.order_count})`}</span>
                {/* ${product.order_count} */}
            </div>
        ))}
    <button
  style={{
    padding: '10px',
    backgroundColor: '#265EE1',
    color: 'white',
    borderRadius: '5px',
    cursor: 'pointer',
    width: '80px',
    transition: 'background-color 0.3s',
  }}
  onClick={onRequestClose}
  className="hover:bg-blue-700"
>
  Close
</button>
    </Modal>
  );
};

export default ProductModal;