import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CartContext } from '../../features/ContextProvider';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCreditCard, faBoxOpen, faScrewdriverWrench, faHandSparkles, faBookOpen } from '@fortawesome/free-solid-svg-icons';
import cartpage from './cartpage.module.scss';
import CarAccordion from '../../components/CartProduct/CartAccordion.jsx';


const CartPage = () => {

    const { cart, dispatch, toggleCart } = useContext(CartContext);
    const [shippingInfo, setShippingInfo] = useState({note: ''});
    const totalPrice = cart.reduce((sum, item) => sum + item.quantity * item.price, 0);
    const navigate = useNavigate();
    
    const handleInputChange = (e) => {
    const { name, value } = e.target;
      setShippingInfo({ ...shippingInfo, [name]: value });
    };
    const handleSubmit = () => {
      if (shippingInfo.note) {
          localStorage.setItem('savedNote', shippingInfo.note);
      }
      navigate('/checkout');
};
    
    useEffect(() => {
        return () => {
          toggleCart(false);
        };
    }, [toggleCart]);

  return (
    <div className={cartpage.container}>
      {cart.length > 0 ? (
        <div>
          <h1>Cart</h1>
          <div className={cartpage.order}>
            {/* ================= TABLE ================= */}
            <table style={{ width: '100%', tableLayout: 'auto' }}>
              <thead>
                <tr style={{ borderBottom: '1px solid #3333331f' }}>
                  <th style={{ textAlign: 'left', padding: '24px 16px 24px 0' }}>Product</th>
                  <th style={{ textAlign: 'center', padding: '24px 16px' }}>Quantity</th>
                  <th style={{ textAlign: 'right', padding: '24px 0 24px 16px' }}>Total</th>
                </tr>
              </thead>

              <tbody style={{ borderBottom: '1px solid #3333331f' }}>
                {cart.map((item) => (
                  <tr key={`${item._id}-${item.colorCode}`}>
                    {/* ===== PRODUCT ===== */}
                    <td style={{ padding: '24px 16px 24px 0' }}>
                      <div
                        style={{
                          display: 'flex',
                          gap: '15px',
                          alignItems: 'center',
                        }}
                      >
                        <img src={item.image} alt={item.name} width={96} />

                        <div
                          style={{
                            display: 'flex',
                            flexDirection: 'column',
                            whiteSpace: 'nowrap',
                          }}
                        >
                          <span style={{ fontWeight: 'bold', fontSize: '16px' }}>{item.name}</span>

                          <span style={{ fontSize: '16px', color: '#333333B3' }}>
                            {new Intl.NumberFormat('vi-VN').format(item.price)} VND
                          </span>

                          {item.color && (
                            <p
                              style={{
                                margin: 0,
                                fontSize: '14px',
                                color: '#333333B3',
                              }}
                            >
                              Color: {item.color}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>

                    {/* ===== QUANTITY ===== */}
                    <td style={{ textAlign: 'center' }}>
                      <div>
                        <button
                          onClick={() =>
                            dispatch({
                              type: 'Increase',
                              id: item._id,
                              colorCode: item.colorCode,
                            })
                          }
                          style={{
                            marginRight: '15px',
                            backgroundColor: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            width: '20px',
                            height: '20px',
                            fontSize: '18px',
                          }}
                        >
                          +
                        </button>

                        <span
                          style={{
                            border: '1px solid #3333331f',
                            display: 'inline-block',
                            padding: '5px 15px',
                            borderRadius: '8px',
                          }}
                        >
                          {item.quantity}
                        </span>

                        <button
                          onClick={() =>
                            dispatch({
                              type: 'Decrease',
                              id: item._id,
                              colorCode: item.colorCode,
                            })
                          }
                          style={{
                            marginLeft: '15px',
                            backgroundColor: '#fff',
                            border: 'none',
                            cursor: 'pointer',
                            width: '20px',
                            height: '20px',
                            fontSize: '20px',
                          }}
                        >
                          -
                        </button>
                      </div>

                      <span
                        style={{
                          display: 'block',
                          marginTop: '8px',
                          cursor: 'pointer',
                          fontSize: '14px',
                          color: '#333333B3',
                        }}
                        onClick={() =>
                          dispatch({
                            type: 'Remove',
                            id: item._id,
                            colorCode: item.colorCode,
                          })
                        }
                      >
                        Remove
                      </span>
                    </td>

                    {/* ===== TOTAL ===== */}
                    <td
                      style={{
                        textAlign: 'right',
                        padding: '24px 0 24px 16px',
                      }}
                    >
                      {new Intl.NumberFormat('vi-VN').format(item.price * item.quantity)} VND
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* ================= SUMMARY ================= */}
            <div className={cartpage.form}>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#333333B3',
                  fontSize: '16px',
                }}
              >
                <span>Subtotal</span>
                <span>{new Intl.NumberFormat('vi-VN').format(totalPrice)} VND</span>
              </div>

              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  color: '#333333',
                  fontSize: '20px',
                  marginTop: '8px',
                }}
              >
                <span>Total</span>
                <span>{new Intl.NumberFormat('vi-VN').format(totalPrice)} VND</span>
              </div>

              <span
                style={{
                  display: 'block',
                  marginTop: '8px',
                  fontSize: '14px',
                }}
              >
                Tax included. Shipping calculated at checkout.
              </span>

              {/* Floating Label */}
              <div className={cartpage.ordernote} style={{ marginTop: '20px' }}>
                <textarea id="note" name="note" placeholder=" " value={shippingInfo.note} onChange={handleInputChange}></textarea>
                <label htmlFor="note">Order note</label>
              </div>

              <button style={{ marginTop: '20px' }} onClick={handleSubmit}>
                <FontAwesomeIcon icon={faCreditCard} />
                Checkout
              </button>
            </div>
          </div>
        </div>
      ) : (
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <h1>Cart</h1>
          <p>Your shopping cart is currently empty.</p>
          <button
            onClick={() => navigate('/shop')}
            style={{
              padding: '10px 25px',
              marginTop: '20px',
              border: 'none',
              borderRadius: '15px',
              backgroundColor: '#000',
              color: '#fff',
              cursor: 'pointer',
            }}
          >
            Continue shopping
          </button>
        </div>
      )}
      <div className={cartpage.section}>
        <div className={cartpage.section_1}>
            <h1 style={{marginTop:'-50px'}}>Have a question ?</h1>
            <p>Our FAQs will help you quickly find answers to common questions about our products and services.</p>
            <span>Average response time: 1 hour</span>
            <div className={cartpage.block}>
                <div>
                    <FontAwesomeIcon icon={faBoxOpen} style={{fontSize: '35px'}}/>
                    <p>Safe shipping</p>
                    <p>Absolute protection for the products you order</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faScrewdriverWrench} style={{fontSize: '35px'}} />
                    <p>Professional installation</p>
                    <p>Installation exactly where you want it</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faHandSparkles} style={{fontSize: '35px'}}/>
                    <p>Site Restoration</p>
                    <p>Collect packaging and clean the installation space before leaving</p>
                </div>
                <div>
                    <FontAwesomeIcon icon={faBookOpen} style={{fontSize: '35px'}} />
                    <p>User Manual</p>
                    <p>Ensure immediate mastery of the product</p>
                </div>
            </div>
        </div>
        <div>
            <CarAccordion cartpage={cartpage}/>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
