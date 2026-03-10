import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import userService from '../../service/userService.js';
import EditProfile from './EditProfile.jsx';
import SubNavbar from '../../components/Navbar/SubNavbar.jsx';
import SubFooter from '../../components/Footer/SubFooter.jsx';

const Profile = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

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
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <SubNavbar />
      
      <div 
        style={{ 
          flex: 1, 
          padding: '40px max(20px, calc((100% - 1200px) / 2))' 
        }}
      >
        <h2 style={{ textAlign: 'left', marginBottom: '20px' }}>Profile</h2>
        
        <div style={{ backgroundColor: '#f6f6f6', borderRadius: '20px', padding: '35px 20px' }}>
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
                <label style={{ fontSize: '14px', color: 'rgba(0,0,0,0.56)' }}>
                  Phone number:
                </label>
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
      </div>

      <SubFooter />
    </div>
  );
};

export default Profile;