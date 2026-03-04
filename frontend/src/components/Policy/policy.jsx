import styles from './policy.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
const PolicyModal = ({ policy, onClose, isOpen }) => {
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ''}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {policy && (
          <>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '30px',
              }}
            >
              <h3 style={{ fontSize: '21px' }}>{policy.title}</h3>
              <button
                onClick={onClose}
                style={{ border: 'none', backgroundColor: '#fff', cursor: 'pointer' }}
              >
                <FontAwesomeIcon icon={faXmark} />
              </button>
            </div>
            <p style={{ fontSize: '14px' }}>{policy.content}</p>
          </>
        )}
      </div>
    </div>
  );
};

export default PolicyModal;
