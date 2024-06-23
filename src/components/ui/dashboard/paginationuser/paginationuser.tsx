import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import styles from '../paginationuser/paginationuser.module.css';

const PaginationUser = ({ currentPage, totalPages, onPageChange, totalUsers }) => {
    return (
        <div className={styles.container}>
            {/* <div className={styles.info}>
                <span>Total Users: {totalUsers}</span>
            </div> */}
            <div className={styles.buttonGroup}>
                <button 
                    className={styles.buttonBack} 
                    onClick={() => onPageChange(currentPage - 1)} 
                    disabled={currentPage === 1}
                >
                    <MdArrowBack />
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button 
                    className={styles.buttonNext} 
                    onClick={() => onPageChange(currentPage + 1)} 
                    disabled={currentPage === totalPages}
                >
                    <MdArrowForward />
                </button>
            </div>
        </div>
    );
};

export default PaginationUser;
