
import styles from "../../styles/getrandom.module.css";
import { NewHams } from "../../models/NewHams";

interface Competitor {
  competitor: NewHams;
}
/*interface NewHams {
  games: number;
  defeats: number;
  wins: number;
  name: string;

}*/

const card = ({ competitor }: Competitor) => {
  return (
    <div className={styles.test}>
      <h2>{competitor.name}</h2>
      <p>Wins: {competitor.wins}</p>
      <p>Defeats: {competitor.defeats}</p>
      <p>Games: {competitor.games}</p>
    </div>
  );
};

export default card;