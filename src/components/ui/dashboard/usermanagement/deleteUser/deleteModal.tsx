import { MdClear } from "react-icons/md";
import styles from '../deleteUser/deleteModal.module.css';

type propTypes = {
    open: boolean;
    onClose: () => void;
    children: React.ReactNode;
}

const ModalDelete: React.FC<propTypes> = ({ open, onClose, children }) => {
    return (
        <div className={`${styles.modal} ${open ? styles.modalVisible : styles.modalInvisible}`} onClick={onClose}>
            <div className={`${styles.modalContent} ${open ? styles.modalOpen : styles.modalClosed}`} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose}>
                    <MdClear size={24}/>
                </button>
                {children}
            </div>
        </div>
    )
}

export default ModalDelete;
