import Image from "next/image";
import styles from "./Episodes.module.scss";

const Episodes = () => {
  return (
    <div>
      <div className={styles.main}>
        <h3>Episodes</h3>
        <br />
        <div>
          <label htmlFor="select">Choose a season:</label>
          <select id="select">
            <option>One</option>
            <option>Two</option>
            <option>Three</option>
            <option>Four</option>
            <option>Five</option>
          </select>
        </div>
        <br />
        <br />
        <div className={styles.data_table}>
          <table className={styles.table}>
            <thead>
              <tr className={styles.tr}>
                <th className={styles.th}>#</th>
                <th className={styles.th}>Name</th>
                <th className={styles.th}>Featured Characters</th>
              </tr>
              <tr className={styles.tr}>
                <td className={styles.td}>1</td>
                <td className={styles.td}>Name</td>
                <td className={styles.td}>
                  <Image className={styles.image} src="https://m.media-amazon.com/images/I/71qTm-Xrh0L._AC_UF1000,1000_QL80_.jpg" width={40} height={40} alt="episode" />
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Episodes;
