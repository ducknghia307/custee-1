import { MdSearch } from 'react-icons/md';
import styles from '../search/search.module.css';

interface LayoutProps {
    placeholder: string;
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Search: React.FC<LayoutProps> = ({ placeholder, value, onChange }) => {
    return (
        <div className={styles.container}>
            <MdSearch/>
            <input
                type="text"
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className={styles.input}
            />
        </div>
    );
};

export default Search;
