import Navbar from "@/components/ui/dashboard/navbar/navbar"
import Sidebar from "@/components/ui/dashboard/sidebar/sidebar"
import styles from "../../components/ui/dashboard/dashboard.module.css"

interface LayoutProps {
    children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {

    return (
        <div className={styles.container}>
            <div className={styles.menu}><Sidebar /></div>
            <div className={styles.content}><Navbar /> {children}</div>

        </div>
    )
}

export default Layout