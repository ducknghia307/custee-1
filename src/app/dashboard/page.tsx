import Card from "@/components/ui/dashboard/carddashboard/card";
import styles from "../../components/ui/dashboard/dashboard.module.css"
import Chart from "@/components/ui/dashboard/chartdasboard/chart";

const Dashboard = () => {
  return (
    <div>
      <h3 className={styles.h3}>Dashboard</h3>
      <div className={styles.wrapper} >
        <div className={styles.main}>
          <div className={styles.cards}>
            <Card />
            
          </div>
          <Chart />
        </div>
      </div>
    </div>
  );
}

export default Dashboard