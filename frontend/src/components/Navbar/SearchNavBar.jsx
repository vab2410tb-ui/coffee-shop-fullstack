import { Link } from 'react-router-dom';


const SearchNavBar = ({ products, onClose }) => {
  

  
  const allVariants = [];
  if (Array.isArray(products)) {
    products.forEach((p) => {
      if (p.variants && p.variants.length > 0) {
        p.variants.forEach((v) => {
          allVariants.push({
            ...v,
            productName: p.name,
            productPrice: p.price,
            productSku: p.sku,
            productId: p._id,
          });
        });
      }
    });
  }

  return (
   
    <div
      style={{
        position: 'absolute',
        backdropFilter: 'blur(8px)',
        left: '0', 
        width: '100%', 
        backgroundColor: 'rgba(242, 242, 242, 0.85)',
        borderRadius: '0 0 10px 10px',
        maxHeight: '400px',
        overflowY: 'auto',
        zIndex: 10000,
        paddingInline: 'max(20px, calc(100% - 950px)/2)'
      }}
    >
      {allVariants.length === 0 ? (
        <div style={{ padding: '20px', textAlign: 'center', color: '#666' }}>
          No products or colors found.
        </div>
      ) : (
        allVariants.map((item, index) => (
          <Link
           
            to={`/products/${item.productSku}`}
            key={`${item.productId}-${index}`}
            style={{
              display: 'flex',
              alignItems: 'center',
              padding: '12px 15px',
              textDecoration: 'none',
              color: '#333',
              borderTop: '1px solid #3333331f',
              transition: 'background 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#f9f9f9')}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'transparent')}
          >
            {/* Ảnh của đúng màu đó */}
            <img
              src={
                item.images && item.images.length > 0
                  ? item.images[0]
                  : '/path/to/default-image.png'
              }
              width="55"
              height="55"
              style={{
                objectFit: 'cover',
                borderRadius: '4px',
                marginRight: '15px',
              }}
              alt={item.productName}
            />

            <div style={{ flex: 1 }}>
              <div
                style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
              >
                <b style={{ fontSize: '14px' }}>{item.productName}</b>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <small style={{ color: '#7f8c8d' }}>SKU: {item.productSku}</small>
                <span style={{ color: '#ccc' }}>|</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                  <span
                    style={{
                      width: '10px',
                      height: '10px',
                      borderRadius: '50%',
                      backgroundColor: item.colorCode || '#ccc',
                      border: '1px solid #ddd',
                    }}
                  ></span>
                  <small style={{ fontWeight: '500' }}>Color: {item.color || 'Default'}</small>
                </div>
              </div>
              <span style={{ fontSize: '14px', fontWeight: 'bold' }}>
                {item.productPrice?.toLocaleString()} VND
              </span>
            </div>

            {/* Tình trạng kho của màu này */}
            <span
              style={{
                fontSize: '11px',
                marginLeft: '15px',
                padding: '3px 8px',
                borderRadius: '4px',
                color: item.stock > 0 ? '#27ae60' : '#e74c3c',
                backgroundColor: item.stock > 0 ? '#eafaf1' : '#fdedec',
                whiteSpace: 'nowrap',
              }}
            >
              {item.stock > 0 ? 'In Stock' : 'Out of stock'}
            </span>
          </Link>
        ))
      )}
    </div>
  );
};

export default SearchNavBar;
