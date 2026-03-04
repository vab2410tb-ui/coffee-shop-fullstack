import crypto from 'crypto';

const generateOrderId = () => {

  const date = new Date().toISOString().slice(0, 10).replace(/-/g, ""); 
  
  const randomStr = crypto.randomBytes(3).toString('hex').toUpperCase(); 
  
  return `NAB-${date}-${randomStr}`;
};


export default generateOrderId;