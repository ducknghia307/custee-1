import Card from "@/components/ui/dashboard/carduser/card";
import styles from "../../../components/ui/dashboard/users/users.module.css"
import Chart from "@/components/ui/dashboard/chartuser/chart";

const UsersPage = () => {
  return (
    <div>
      <h3 className={styles.h3}>User</h3>
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

export default UsersPage
