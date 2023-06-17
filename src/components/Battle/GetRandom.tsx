import { useCallback, useEffect, useState } from "react";
import { NewHams } from "../../models/NewHams";
import styles from "../../styles/getrandom.module.css";
import Card from "./card";
import { fixUrl } from "../../utils";

const GetRandom = () => {
  const [competitorOne, setCompetitorOne] = useState<NewHams | null>(null);
  const [competitorTwo, setCompetitorTwo] = useState<NewHams | null>(null);
  const [winnerHam, setWinnerHam] = useState<null | NewHams>(null);
  const [matchPlayed, setMatchPlayed] = useState<boolean>(true);
  const [overlay, setOverlay] = useState<boolean>(false);

  useEffect(() => {
    // Hämta två hamstrar när sidan laddas
    async function getData() {
      const secondResponse = await fetch(fixUrl("/hamsters/random"));
      const competitorOne = await secondResponse.json();
      setCompetitorOne(competitorOne);
    }
    getData();
  }, []);

  useEffect(() => {
    // Hämta två hamstrar när sidan laddas
    async function getData() {
      const secondResponse = await fetch(fixUrl("/hamsters/random"));
      const competitorTwo = await secondResponse.json();
      setCompetitorTwo(competitorTwo);
    }
    getData();
  }, []);

  const newGame = () => {
    // Startar ett nytt spel
    setOverlay(false);
    sendRequest(setCompetitorOne);
    sendRequest(setCompetitorTwo);
    setWinnerHam(null);
    setMatchPlayed(true);
  };

  const fetchStats = useCallback(
    async (
      winner: NewHams,
      loser: NewHams,
      setWinnerData: (arg0: any) => void,
      setLoserData: (arg0: any) => void
    ) => {
      const winResponse = await fetch(fixUrl(`/hamsters/${winner.id}`));
      const winnerData = await winResponse.json();

      setWinnerData(winnerData);

      const loserResponse = await fetch(fixUrl(`/hamsters/${loser.id}`));
      const loserData = await loserResponse.json();

      setLoserData(loserData);

      // compare results
      const hamsOneResult = winnerData.wins - winnerData.defeats;
      const hamsTwoResult = loserData.wins - loserData.defeats;

      if (hamsOneResult > hamsTwoResult) {
        // hamsOne wins
        setWinnerHam(winnerData);
      } else {
        // hamsTwo wins
        setWinnerHam(loserData);
      }
    },
    []
  );

  const updateMatch = useCallback(async (winner: NewHams, loser: NewHams) => {
    await fetch(fixUrl(`/hamsters/${winner.id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        defeats: winner.defeats,
        wins: winner.wins + 1,
        games: winner.games + 1,
      }),
    });

    await fetch(fixUrl(`/hamsters/${loser.id}`), {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        wins: loser.wins,
        defeats: loser.defeats + 1,
        games: loser.games + 1,
      }),
    });
  }, []);

  const handleClick = useCallback(
    async (
      winner: NewHams,
      loser: NewHams,
      setWinnerData: (arg0: NewHams) => void,
      setLoserData: (arg1: NewHams) => void
    ) => {
      // Kollar om hamstern är klickbar
      if (!matchPlayed) return;
      // Väntar på att hamsterns stats uppdateras
      await updateMatch(winner, loser);
      // Väntar på att hamsterns nya stats hämtas
      await fetchStats(winner, loser, setWinnerData, setLoserData);

      // Visar statsen
      setOverlay(true);

      // Gör så att hamstern inte är klickbar längre
      setMatchPlayed(false);
    },
    [updateMatch, fetchStats]
  );

  const handleRandom = () => {
    newGame();
  };

  return (
    <div className={styles.container}>
      <section className={styles.wrapper}>
        {competitorOne && competitorTwo ? (
          <div
            onClick={() => {
              handleClick(
                competitorOne,
                competitorTwo,
                setCompetitorOne,
                setCompetitorTwo
              );
            }}
            className={styles.card}
          >
            {competitorOne.imgName &&
            competitorOne.imgName.startsWith("hamster") ? (
              <img
                src={fixUrl(`/img/${competitorOne.imgName}`)}
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
            onClick={() => {
              handleClick(
                competitorTwo,
                competitorOne,
                setCompetitorTwo,
                setCompetitorOne
              );
            }}
            className={styles.card}
          >
            {competitorTwo.imgName &&
            competitorTwo.imgName.startsWith("hamster") ? (
              <img
                src={fixUrl(`/img/${competitorTwo.imgName}`)}
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

      <div className={styles.winninghamster}>
        {winnerHam != null ? (
          <p>
            {" "}
            <b>The winner is {winnerHam.name}</b>
            <br /> Total victory-{winnerHam.wins} <br />
            Total defeats-{winnerHam.defeats} <br />
            Total matches-{winnerHam.games}{" "}
          </p>
        ) : (
          <p></p>
        )}
        <button className={styles.btn} onClick={handleRandom}>
          Start a new battle!
        </button>
      </div>
    </div>
  );
};

// Hämta hamstrar
async function sendRequest(setCompetitor: any) {
  const firstResponse = await fetch(fixUrl("/hamsters/random"));
  const competitorOne = await firstResponse.json();
  setCompetitor(competitorOne);
}

export default GetRandom;
