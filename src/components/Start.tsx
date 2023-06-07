import { useEffect, useState } from "react";
import { NewHams } from "../models/NewHams";
import styles from "../styles/start.module.css";
import { fixUrl } from "../utils";

const Start = () => {
  const [cutest, setCutest] = useState<NewHams | null>(null);

  useEffect(() => {
    async function getHamsterts() {
      const response: Response = await fetch(fixUrl("/hamsters/cutest"));
      const cutestsHamster: NewHams = await response.json();
      setCutest(cutestsHamster);
    }
    getHamsterts();
  }, []);

  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <h1> Welcome </h1>
        <p>Are you ready to battle it out?</p>
      </header>
      <main className={styles.flexbox}>
        <article>
          <h3> Instructions </h3>
          <p>
            det här spelet är att du ska välja den sötaste hamstern enligt din
            åsikt. Du har precis blivit kallad till spelet och är på väg att gå
            in i ultimata gladiatorpit! Men först behöver du instruktioner.
            <br />
            Använd navigeringsfältet högst upp för att utforska det mäktiga
            spelet!
          </p>
          <h3>Lycka till! </h3>
        </article>

        {cutest ? (
          <section className={styles.card}>
            <img
              src={fixUrl(`/img/${cutest.imgName}`)}
              alt={cutest.name}
              className="card__img"
            />
            <div className={styles.card__body}>
              <h2 className={styles.card__title}>{cutest.name}</h2>
              <p>
                is currently the cutest hamster... <br /> but things can change!
              </p>
              <p>Wins: {cutest.wins}!</p>
            </div>
          </section>
        ) : (
          "Loading"
        )}
      </main>
    </section>
  );
};

export default Start;
