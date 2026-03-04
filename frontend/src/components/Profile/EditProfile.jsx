import { useState, useEffect, useMemo } from 'react';
import editProfile from './editprofile.module.scss';

const EditProfile = ({ isOpen, onClose, initialData, onSave, loading }) => {
  const [localData, setLocalData] = useState({ name: '', email: '', phone: '', address: '' });

  useEffect(() => {
    if (isOpen && initialData) {
      setLocalData(initialData);
    }
  }, [isOpen, initialData]);

  const isChanged = useMemo(() => {
    if (!initialData) return false;
    return JSON.stringify(localData) !== JSON.stringify(initialData);
  }, [localData, initialData]);

  const handleChange = (e) => {
    setLocalData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isChanged && !loading) {
      onSave(localData);
    }
  };

  return (
    <div className={`${editProfile.overlay} ${isOpen ? editProfile.show : ''}`} onClick={onClose}>
      <div className={editProfile.modal} onClick={(e) => e.stopPropagation()}>
        <h3 style={{ textAlign: 'center', marginBottom: '30px', fontSize: '21px' }}>
          Edit profile
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          <div className={editProfile.inputGroup}>
            <input name="name" value={localData.name} onChange={handleChange} required />
            <label>Full name: </label>
          </div>

          <div className={editProfile.inputGroup}>
            <input name="email" value={localData.email} onChange={handleChange} required />
            <label>Email</label>
          </div>

          <div className={editProfile.inputGroup}>
            <input
              type="number"
              name="phone"
              value={localData.phone}
              onChange={handleChange}
              required
            />
            <label>Phone</label>
          </div>

          <div className={editProfile.inputGroup}>
            <textarea
              name="address"
              value={localData.address}
              onChange={handleChange}
              rows="3"
              required
            />
            <label>Address</label>
          </div>
        </div>

        <div className={editProfile.btn}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button type="submit" onClick={handleSubmit} disabled={loading || !isChanged}>
            {loading ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
