import { MdSearch } from 'react-icons/md';
import styles from '../search/search.module.css';


interface LayoutProps {
    placeholder: string;
}

const Search: React.FC<LayoutProps> = ({ placeholder }) => {
    return (
        <div className={styles.container}>
            <MdSearch/>
            <input type="text" placeholder={placeholder} className={styles.input} />       </div>
    )
}

export default Search