import { useEffect, useState } from "react";
import { NewHams } from "../../models/NewHams";
import styles from "../../styles/getrandom.module.css";
import { updateMatch } from "../helperFunctions/Helpers";
import Card from "./card";

const GetRandom = () => {
  const [competitorOne, setCompetitorOne] = useState<NewHams | null>(null);
  const [competitorTwo, setCompetitorTwo] = useState<NewHams | null>(null);
  const [matchPlayed, setMatchPlayed] = useState<boolean>(true);
  const [overlay, setOverlay] = useState<boolean>(false);

  useEffect(() => {
    // Hämta två hamstrar när sidan laddas
    sendRequestOne(setCompetitorOne);
    sendRequestTwo(setCompetitorTwo);
  }, [setCompetitorOne, setCompetitorTwo]);

  useEffect(() => {
    // Kollar om ingen hamster laddas eller om det är samma
    if (competitorOne === null || competitorTwo === null) return;
    else if (competitorOne.id === competitorTwo.id) {
      sendRequestTwo(setCompetitorTwo);
      console.log("Same hamster, try again");
    }
  }, [competitorOne, competitorTwo]);

  const newGame = () => {
    // Startar ett nytt spel
    setOverlay(false);
    sendRequestOne(setCompetitorOne);
    sendRequestTwo(setCompetitorTwo);
    setMatchPlayed(true);
  };

  const fetchStats = async (
    winner: NewHams,
    loser: NewHams,
    setWinnerData: (arg0: any) => void,
    setLoserData: (arg0: any) => void
  ) => {
    const winResponse = await fetch(`/hamsters/${winner.id}`);
    const winnerData = await winResponse.json();

    setWinnerData(winnerData);

    const loserResponse = await fetch(`/hamsters/${loser.id}`);
    const loserData = await loserResponse.json();

    setLoserData(loserData);
  };

  const handleClick = async (
    winner: NewHams,
    loser: NewHams,
    setWinnerData: (arg0: NewHams) => void,
    setLoserData: (arg1: NewHams) => void
  ) => {
    // Kollar om hamstern är klickbar
    if (matchPlayed) {
      // Väntar på att hamsterns stats uppdateras
      await updateMatch(winner, loser);
      // Väntar på att hamsterns nya stats hämtas
      await fetchStats(winner, loser, setWinnerData, setLoserData);

      // Visar statsen
      setOverlay(true);

      // Gör så att hamstern inte är klickbar längre
      setMatchPlayed(false);
    } else {
      return;
    }
  };

  const handleRandom = () => {
    newGame();
  };

  return (
    <div className={styles.container}>
      <section className={styles.wrapper}>
        {competitorOne && competitorTwo ? (
          <div
            onClick={() =>
              handleClick(
                competitorOne,
                competitorTwo,
                setCompetitorOne,
                setCompetitorTwo
              )
            }
            className={styles.card}
          >
            {competitorOne.imgName &&
            competitorOne.imgName.startsWith("hamster") ? (
              <img
                src={`/img/${competitorOne.imgName}`}
                alt={competitorOne.name}
                key={competitorOne.id}
                className="card__img"
              />
            ) : (
              <img
                src={`https://2.bp.blogspot.com/-pouqaw_aiRU/TqljDfGtkDI/AAAAAAAAB_M/kIpYg8Y_on4/s400/ugly-hamsters2.jpg`}
                alt={competitorOne.name}
                key={competitorOne.id}
                className="card__img"
              />
            )}

            <div className={styles.card__body}></div>
            {overlay ? (
              <Card competitor={competitorOne} />
            ) : (
              <div className={styles.test}>
                <h2 className={styles.card__title}>{competitorOne.name}</h2>
              </div>
            )}
          </div>
        ) : (
          <p> No data </p>
        )}

        <span className={styles.battle}>⚔️</span>

        {competitorTwo && competitorOne ? (
          <div
            onClick={() =>
              handleClick(
                competitorTwo,
                competitorOne,
                setCompetitorTwo,
                setCompetitorOne
              )
            }
            className={styles.card}
          >
            {competitorTwo.imgName &&
            competitorTwo.imgName.startsWith("hamster") ? (
              <img
                src={`/img/${competitorTwo.imgName}`}
                alt={competitorTwo.name}
                key={competitorTwo.id}
                className="card__img"
              />
            ) : (
              <img
                src={`https://2.bp.blogspot.com/-pouqaw_aiRU/TqljDfGtkDI/AAAAAAAAB_M/kIpYg8Y_on4/s400/ugly-hamsters2.jpg`}
                alt={competitorTwo.name}
                key={competitorTwo.id}
                className="card__img"
              />
            )}

            <div className={styles.card__body}></div>
            {overlay ? (
              <Card competitor={competitorTwo} />
            ) : (
              <div className={styles.test}>
                <h2 className={styles.card__title}>{competitorTwo.name}</h2>
              </div>
            )}
          </div>
        ) : (
          <p> No data </p>
        )}
      </section>

      <button onClick={() => handleRandom()} className={styles.btn}>
        Battle!
      </button>
    </div>
  );
};

// Hämta hamstrar
async function sendRequestOne(setCompetitor: any) {
  const firstResponse = await fetch("hamsters/random");
  const competitorOne = await firstResponse.json();
  setCompetitor(competitorOne);
}

async function sendRequestTwo(setCompetitor: any) {
  const secondResponse = await fetch("hamsters/random");
  const competitorTwo = await secondResponse.json();
  setCompetitor(competitorTwo);
}

export default GetRandom;

// const [show, setShow] =  useState({});                                                                                                      return (
//   <>                                                                                                                                                                                                        <p>
//      <button onClick={() => setShow(!show)}>this is the cutes hamster</button>
//     {show &&
//     <div>
//       <p>hamster age: {hamster.age}</p>
//       <p>hamster favorite food: {hamster.favFood}</p>
//       <p>hamster lovs to: {hamster.loves}</p>
//       <p>hamster wins: {hamster.wins}</p>
//       <p>hamster defeats: {hamster.defeats}</p>
//       <p> hamster games: {hamster.games}</p>
//     </div>}
//     </p>                                                                                                                                                                                                                 </>
