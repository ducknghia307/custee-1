import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import styles from '../pagination/pagination.module.css';

const Pagination = () => {
    return (
        <div className={styles.container}>
            <div className={styles.buttonGroup}>
                <button className={styles.buttonBack} disabled><MdArrowBack /></button>
                <button className={styles.buttonNext}><MdArrowForward /></button>
            </div>
        </div>
    )
}

export default Pagination
