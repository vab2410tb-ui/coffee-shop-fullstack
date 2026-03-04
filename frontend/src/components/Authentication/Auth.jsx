import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import authService from '../../service/authenticationService';
import { useLocation, useNavigate } from "react-router-dom";


const Auth = () => {

  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState(1); // 1: Nhập Email | 2: Nhập OTP
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const location = useLocation();
  const navigate = useNavigate();

  const from = location.state?.from || "/";
  
  const handleRequestOTP = async (e) => {
    e.preventDefault();
    if (!email) {
      setMessage('Please enter the OTP code!');
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

  const handleVerifyOTP = async (e) => {
    e.preventDefault();
    if (!otp) {
      setMessage('Please enter the OTP code!');
      return;
    }

    try {
      setLoading(true);
      setMessage('');
      await authService.verifyOTP(email, otp);

      alert('Login successful!');
      navigate(from, { replace: true });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Invalid or expired OTP code!');
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

      {/* Hiển thị thông báo lỗi/thành công */}
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
