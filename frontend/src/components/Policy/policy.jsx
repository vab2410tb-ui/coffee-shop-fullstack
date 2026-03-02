import styles from "./policy.module.scss";

const PolicyModal = ({ policy, onClose, isOpen }) => {
  return (
    <div className={`${styles.overlay} ${isOpen ? styles.show : ""}`} onClick={onClose}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        {/* Chỉ render nội dung nếu policy tồn tại để tránh lỗi crash */}
        {policy && (
          <>
            <h3>{policy.title}</h3>
            <div className={styles.content}>{policy.content}</div>
          </>
        )}
        <button onClick={onClose}>Đóng</button>
      </div>
    </div>
  );
}

export default PolicyModal