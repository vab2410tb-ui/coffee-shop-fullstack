import { useState } from 'react';
import { policies } from '../../data/policy.data.js';
import PolicyModal from '../../components/Policy/policy.jsx';

const SubFooter = () => {
  const [openPolicy, setOpenPolicy] = useState('');

  return (
    <div
      style={{
        borderTop: '1px solid #a5a5a5',
        paddingTop: '15px',
        paddingBottom: '15px',
        width: '100%',
        paddingInline: 'max(20px, calc((100% - 1200px) / 2))',
      }}
    >
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          gap: '15px',
          color: '#6f7eff',
          textDecoration: 'underline',
          cursor: 'pointer',
          justifyContent: 'center',
          margin: 0,
          padding: 0,
        }}
      >
        <li onClick={() => setOpenPolicy('refund')}>Refund Policy</li>
        <li onClick={() => setOpenPolicy('shipping')}>Shipping</li>
        <li onClick={() => setOpenPolicy('privacypolicy')}>Privacy Policy</li>
        <li onClick={() => setOpenPolicy('termofservice')}>Term of service</li>
        <li onClick={() => setOpenPolicy('contactinformation')}>Contact Information</li>
      </ul>

      <PolicyModal
        policy={policies[openPolicy]}
        onClose={() => setOpenPolicy(null)}
        isOpen={!!openPolicy}
      />
    </div>
  );
};

export default SubFooter;
