import { useState, useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../features/AuthContext.jsx';
import userService from '../../service/userService.js';
import authService from '../../service/authenticationService';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login, userInfo } = useContext(AuthContext);
  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || '/';
  const cleanOtp = otp.trim();

  // [User load dữ liệu đầy đủ mới chuyển hướng trang]
  useEffect(() => {
    console.log("Toàn bộ user:", userInfo);
console.log("Giá trị của isAdmin là:", userInfo.role, "| Kiểu dữ liệu:", typeof userInfo.role);
    if(userInfo ) {
      if(userInfo.role === true) {
        navigate('/admin/products', {replace: true});
      } else {
        navigate(from, {replace: true})
      }
    }
  },[userInfo , navigate, from])

  // [Xử lý yêu cầu gửi OTP]
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter your email!');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      await authService.requestOTP(email);

      setStep(2);
      setMessage('A verification code has been sent to your email!');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Failed to send OTP. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // [Xử lý xác thực OTP]
  const handleVerifyOTP = async (e) => {
    e.preventDefault();

    if (!otp) {
      setMessage('Please enter the OTP code!');
      return;
    }

    try {
      setLoading(true);
      setMessage('');

      const verifyResult = await authService.verifyOTP(email, cleanOtp);
      // Lấy Token ra
      const freshToken = verifyResult.token || verifyResult.data?.token;

      // Truyền trực tiếp Token mới vào để lấy Profile
      const userData = await userService.getProfile(freshToken);

      const finalUserData = {
        ...userData,
        token: freshToken,
      };

      login(finalUserData);
      alert('Login successful!');

    } catch (error) {
      console.error(error);
      setMessage(error.response?.data?.message || error.message || 'Error!');

    } finally {
      setLoading(false);
    }
  };
  return (
    <div
      style={{
        height: 'auto',
        maxWidth: '400px',
        marginTop: '300px',
        marginInline: 'auto',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '20px',
        textAlign: 'center',
      }}
    >
      <Link to="/">
        <img src="/icon/image.png" alt="NabCoffeeShop" />
      </Link>
      <p style={{ textAlign: 'left', margin: '45px 0 30px 0' }}>
        {step === 1 ? 'Log in' : 'Enter code'}
      </p>

      {message && (
        <p
          style={{
            color: step === 2 && message.includes('send to') ? 'green' : 'red',
            marginTop: '-20px',
          }}
        >
          {message}
        </p>
      )}

      {step === 1 ? (
        <form onSubmit={handleRequestOTP}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              marginBottom: '15px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            className={authService.btnSub}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#7e7e7e',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {loading ? 'Sending...' : 'Continue'}
          </button>
        </form>
      ) : (
        <form onSubmit={handleVerifyOTP}>
          <p style={{ margin: '10px 0 10px 0', textAlign: 'left' }}>
            Sent to: <strong>{email}</strong>
          </p>
          <input
            type="text"
            placeholder="6-digit code"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            style={{
              width: '100%',
              padding: '15px 0 15px 10px',
              marginBottom: '15px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              textAlign: 'left',
              fontSize: '13px',
            }}
          />
          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '10px',
              backgroundColor: '#7e7e7e',
              color: '#fff',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
              marginBottom: '10px',
            }}
          >
            {loading ? 'Verifying...' : 'Send'}
          </button>

          <button
            type="button"
            onClick={() => setStep(1)}
            style={{
              background: 'none',
              border: 'none',
              color: '#007bff',
              cursor: 'pointer',
              textAlign: 'left',
            }}
          >
            Go back to enter a different email
          </button>
        </form>
      )}
    </div>
  );
};

export default Auth;
