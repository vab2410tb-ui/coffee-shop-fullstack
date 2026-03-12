import { Link } from 'react-router-dom';
import { useContext, useEffect, useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faUser,
  faCartShopping,
  faChevronDown,
  faCircleUser,
  faBoxOpen,
} from '@fortawesome/free-solid-svg-icons';
import { CartContext } from '../../features/ContextProvider.jsx';
import { AuthContext } from '../../features/AuthContext.jsx';
import ProductService from '../../service/productService.js';
import header from './navbar.module.scss';
import SearchNavBar from './SearchNavBar.jsx';

const NavBar = () => {
  const [products, setProducts] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState(searchTerm);
  const { userInfo, logout } = useContext(AuthContext);
  const { toggleCart, cart } = useContext(CartContext);
  const inputRef = useRef(null);

  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (isSearchOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isSearchOpen]);

  const handleLogout = () => {
    logout();
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  useEffect(() => {
    const fetchProducts = async () => {
      if (!debouncedSearch || debouncedSearch.trim() === '') {
        setProducts([]);
        return;
      }
      try {
        const res = await ProductService.searchProducts(debouncedSearch);
        setProducts(res.data?.data || res.data || []);
      } catch (error) {
        console.error('Fetch products failed:', error);
        setProducts([]);
      }
    };
    fetchProducts();
  }, [debouncedSearch]);

  return (
    <div style={{ position: 'relative' }}>
      <div className={header.header}>
        <div className={header.header__logo}>
          <Link to="/" className={header.header__link}>
            <img src="/icon/image.png" alt="NabCoffeeShop" />
          </Link>
        </div>
        <div className={`${header['header__main-nav']}`}>
          <ul className={header.header__list}>
            <li>
              <Link to="/" className={header.header__link}>
                HOME
              </Link>
            </li>
            <li className={header['header__link-shop']}>
              <Link to="/shop">SHOP </Link>
              <FontAwesomeIcon
                icon={faChevronDown}
                style={{ width: '15px', height: '15px', marginLeft: '7px' }}
              />

              <ul className={header['link__shop-list']}>
                <li>
                  <Link to="/shop/espresso-machine">ESPRESSO MACHINE</Link>
                </li>
                <li>
                  <Link to="/shop/grinder-machine">GRINDER MACHINE</Link>
                </li>
                <li>
                  <Link to="/shop/coffee-beans">COFFEE BEANS</Link>
                </li>
                <li>
                  <Link to="/shop/accessories">ACCESSORIES</Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/warranty" className={header.header__link}>
                WARRANTY
              </Link>
            </li>
            <li>
              <Link to="/contact" className={header.header__link}>
                CONTACT
              </Link>
            </li>
          </ul>
        </div>

        <div className={`${header['header__secondary-nav']}`}>
          <ul>
            <li className={header.userMenu}>
              <Link to="/profile">
                <FontAwesomeIcon icon={faUser} className={header.iconUser} />
                {userInfo && <FontAwesomeIcon icon={faChevronDown} />}
              </Link>
              <ul className={header.iconUser_list}>
                {userInfo ? (
                  <>
                    <li
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '10px',
                        borderBottom: '1px solid',
                        paddingBottom: '20px',
                      }}
                    >
                      <span>
                        <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '32px' }} />
                      </span>
                      <div
                        style={{
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px',
                          color: '#222222',
                        }}
                      >
                        <p>{userInfo.name}</p>
                        <p>{userInfo.email}</p>
                      </div>
                    </li>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '30px',
                        marginTop: '40px',
                      }}
                      className={header.userSetting}
                    >
                      <Link to="/profile">
                        <p style={{ color: '#000', fontWeight: '300' }}>Profile</p>
                      </Link>

                      <Link to={`/orders/${userInfo._id}`}>
                        <p style={{ color: '#000', fontWeight: '300' }}>Orders</p>
                      </Link>

                      <p
                        onClick={handleLogout}
                        style={{
                          textAlign: 'left',
                          color: '#000',
                          border: 'none',
                          cursor: 'pointer',
                          fontWeight: '300',
                          marginBottom: '20px',
                        }}
                      >
                        Log out
                      </p>
                    </div>
                  </>
                ) : (
                  <li style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                    <span>
                      <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '32px' }} />
                    </span>
                    <h4>
                      <Link to="/authentic/login">Log in</Link>
                    </h4>
                  </li>
                )}
              </ul>
            </li>

            <li>
              <FontAwesomeIcon
                icon={faMagnifyingGlass}
                className={header.icon}
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                style={{cursor: 'pointer'}}
              />
            </li>

            <li>
              <div className={header.iconWrapper} onClick={() => toggleCart(true)}>
                <FontAwesomeIcon icon={faCartShopping} className={header.icon} />
                <span className={header.badge}>{totalItems}</span>
              </div>
            </li>
          </ul>
        </div>
      </div>

      <div className={header.title}>
        <span>Free Shipping on orders over 500.000₫</span>
        <Link to="/search-order">
          <span>
            Track Your Order <FontAwesomeIcon icon={faBoxOpen} style={{ marginLeft: '10px' }} />
          </span>
        </Link>
      </div>

      <div
        style={{
          position: 'fixed',
          top: '128px',
          left: 0,
          width: '100%',
          height: '100vh',
          backdropFilter: isSearchOpen ? 'blur(8px)' : 'blur(0px)',
          zIndex: 9999,
          display: 'flex',
          flexDirection: 'column',
          visibility: isSearchOpen ? 'visible' : 'hidden',
          pointerEvents: isSearchOpen ? 'auto' : 'none',
          
        }}
        onClick={() => {
          setIsSearchOpen(false);
          setSearchTerm('');
        }}
      >
        <div
          onClick={(e) => e.stopPropagation()}
          style={{
            width: '100%',
            position: 'relative',
            transform: isSearchOpen ? 'translateY(0)' : 'translateY(-50px)',
            display: isSearchOpen ? 'block' : 'none',
          }}
        >
          <FontAwesomeIcon
            icon={faMagnifyingGlass}
            className={header.icon}
            style={{
              position: 'absolute',
              zIndex: '1000',
              right: '35px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#666',
              cursor: 'pointer',
              paddingInline: 'max(20px, calc(100% - 950px)/2)',
            }}
          />
          <input
            type="text"
            placeholder="Search by product name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            autoFocus
            style={{
              backdropFilter: 'blur(8px)',
              width: '100%',
              padding: '25px 60px 25px 25px',
              fontSize: '18px',
              border: 'none',
              backgroundColor: 'rgba(242, 242, 242, 0.85)',
              outline: 'none',
              boxSizing: 'border-box',
              zIndex: 9999,
              paddingInline: 'max(20px, calc(100% - 950px)/2)',
            }}
          />
          

          {/* Khung chứa kết quả tìm kiếm */}
          {debouncedSearch && products.length > 0 && (
            <div
              style={{ width: '100%', position: 'absolute', top: '100%', left: 0, zIndex: 99 }}
            >
              <SearchNavBar products={products} onClose={() => setIsSearchOpen(false)} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
