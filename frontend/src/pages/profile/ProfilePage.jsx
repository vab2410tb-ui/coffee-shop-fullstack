import { useState, useEffect } from 'react';
import { useNavigate, Link, NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faChevronDown, faCircleUser } from '@fortawesome/free-solid-svg-icons';
import { policies } from '../../data/policy.data.js';
import userService from '../../service/userService.js';
import EditProfile from './EditProfile.jsx';
import profile from './profile.module.scss';
import PolicyModal from '../../components/Policy/policy.jsx';

const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });
  const [openPolicy, setOpenPolicy] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  
  const handleLogout = () => {
    localStorage.removeItem('userInfo');
    window.location.href = '/';
  };
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const userInfo = localStorage.getItem('userInfo');
        if (!userInfo) {
          navigate('/authentic/login');
          return;
        }

        const data = await userService.getProfile();
        setFormData({
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          address: data.address || '',
        });
      } catch (err) {
        setError('Your session has expired. Please log in again!');
        localStorage.removeItem('userInfo');
        navigate('/login');
      }
    };

    fetchProfileData();
  }, [navigate]);

  // Btn Update
  const submitHandler = async (updatedData) => {
    setLoading(true);
    setMessage('');
    setError('');

    try {
      await userService.updateProfile(updatedData);

      setFormData(updatedData);

      setMessage('Profile updated successfully!');
      setIsEditOpen(false);

      setTimeout(() => {
        setMessage('');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <header>
        <Link to="/">
          <img src="/icon/image.png" alt="NabCoffeeShop" width={80} />
        </Link>

        <NavLink
          to="/orders"
          style={({ isActive }) => ({
            textDecoration: isActive ? 'underline' : 'none',
            textUnderlineOffset: isActive ? '4px' : 'auto',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Orders
        </NavLink>

        <NavLink
          to="/profile"
          style={({ isActive }) => ({
            textDecoration: isActive ? 'underline' : 'none',
            textUnderlineOffset: isActive ? '4px' : 'auto',
            fontWeight: isActive ? 'bold' : 'normal',
          })}
        >
          Profile
        </NavLink>

        <li style={{ listStyle: 'none', marginLeft: 'auto' }}>
          <div className={profile.down}>
            <div style={{ display: 'flex' }}>
              <FontAwesomeIcon icon={faCircleUser} style={{ fontSize: '25px' }} />
              <FontAwesomeIcon
                icon={faChevronDown}
                className={profile.iconDown}
                style={{ fontSize: '20px' }}
              />
            </div>

            <ul className={profile.listSetting}>
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
                  <p>{formData.name}</p>
                  <p>{formData.email}</p>
                </div>
              </li>

              <div
                style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '40px' }}
              >
                <Link to="/profile">
                  <p style={{ color: '#000', fontWeight: '300' }}>Profile</p>
                </Link>
                <p style={{ color: '#000', fontWeight: '300' }}>Orders</p>
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
            </ul>
          </div>
        </li>
      </header>

      <h2 style={{ textAlign: 'left', marginBottom: '20px', marginInline: '400px' }}>Profile </h2>
      <div
        style={{
          backgroundColor: '#f6f6f6',
          marginInline: '400px',
          borderRadius: '20px',
          padding: '35px 20px',
        }}
      >
        {message && (
          <div
            style={{
              padding: '10px',
              backgroundColor: '#d4edda',
              color: '#155724',
              marginBottom: '15px',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            {message}
          </div>
        )}
        {error && (
          <div
            style={{
              padding: '10px',
              backgroundColor: '#f8d7da',
              color: '#721c24',
              marginBottom: '15px',
              borderRadius: '4px',
              textAlign: 'center',
            }}
          >
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ fontSize: '14px', color: 'rgba(0,0,0,0.56)' }}>Name: </label>
              <FontAwesomeIcon
                icon={faPen}
                onClick={() => setIsEditOpen(true)}
                style={{ cursor: 'pointer', marginLeft: '20px', fontSize: '13px' }}
              />
              <p style={{ fontSize: '14px' }}>{formData.name}</p>
            </div>

            <div>
              <label style={{ fontSize: '14px', color: 'rgba(0,0,0,0.56)' }}>Email: </label>
              <p style={{ fontSize: '14px' }}>{formData.email}</p>
            </div>

            <div>
              <label style={{ fontSize: '14px', color: 'rgba(0,0,0,0.56)' }}>Phone number: </label>
              <p style={{ fontSize: '14px' }}>{formData.phone}</p>
            </div>

            <div>
              <label style={{ fontSize: '14px', color: 'rgba(0,0,0,0.56)' }}>Address: </label>
              <p style={{ fontSize: '14px' }}>{formData.address}</p>
            </div>
          </div>

          <EditProfile
            isOpen={isEditOpen}
            onClose={() => setIsEditOpen(false)}
            initialData={formData}
            setFormData={setFormData}
            onSubmit={submitHandler}
            onSave={(updatedData) => {
              submitHandler(updatedData);
            }}
            loading={loading}
          />
        </div>
      </div>
      <ul
        style={{
          display: 'flex',
          listStyle: 'none',
          borderTop: '1px solid #a5a5a5',
          paddingTop: '15px',
          width: '1120px',
          gap: '15px',
          marginInline: '400px',
          position: 'absolute',
          bottom: '30px',
          color: '#6f7eff',
          textDecoration: 'underline',
          cursor: 'pointer',
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

export default Profile;
