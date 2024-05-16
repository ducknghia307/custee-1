import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "../carddashboard/card.module.css";

const stats = [
  { title: "Total Users", number: "10.123", detail: "12% more than last month", icon: <MdSupervisedUserCircle size={24} /> },
  { title: "Total Orders", number: "10.123", detail: "12% more than last month", icon: <MdSupervisedUserCircle size={24} /> },
  { title: "Total Sales", number: "10.123", detail: "12% more than last month", icon: <MdSupervisedUserCircle size={24} /> },
  { title: "Total Pending", number: "10.123", detail: "12% more than last month", icon: <MdSupervisedUserCircle size={24} /> },
];

const Card = () => {
    return (
        <div className={styles.cardsContainer}>
            {stats.map((stat, index) => (
                <div key={index} className={styles.card}>
                    <div className={styles.texts}>
                        <span className={styles.title}>{stat.title}</span>
                        <span className={styles.number}>{stat.number}</span>
                        <span className={styles.detail}>
                            <span className={styles.positive}>{stat.detail.split(" ")[0]}</span> {stat.detail.substring(stat.detail.indexOf(" ") + 1)}
                        </span>
                    </div>
                    {stat.icon}
                </div>
            ))}
        </div>
    );
};

export default Card;
