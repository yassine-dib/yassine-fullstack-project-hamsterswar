import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import allHamsters from "../Atoms/allHamsters";
import { NewHams } from "../models/NewHams";
import styles from "../styles/start.module.css";
import { fixUrl } from "../utils";

const Start = () => {
  const [data, setData] = useRecoilState<[] | NewHams[]>(allHamsters);
  const [cutest, setCutest] = useState<null | NewHams>(null);

  useEffect(() => {
    async function getData() {
      const response: Response = await fetch(fixUrl("/hamsters/"));
      const apiData: any = await response.json();
      console.log("apiData", apiData);
      setData(apiData as NewHams[]);
    }
    getData();
    console.log(data);
  }, []);

  useEffect(() => {
    sendRequest(setCutest);
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

        {cutest
          ? cutest.map((hamster) => (
              <section className={styles.card} key={Math.random() + hamster.id}>
                <img
                  src={`/img/${hamster.imgName}`}
                  alt={hamster.name}
                  className="card__img"
                />
                <div className={styles.card__body}>
                  <h2 className={styles.card__title}>{hamster.name}</h2>
                  <p>
                    is currently the cutest hamster... <br /> but things can
                    change!
                  </p>
                  <p>Wins: {hamster.wins}!</p>
                </div>
              </section>
            ))
          : "Loading"}
      </main>
    </section>
  );
};

async function sendRequest(setCutest: any) {
  try {
    const response = await fetch("/hamsters/cutest");
    const data = await response.json();
    setCutest(data);
  } catch (error) {
    console.log(error);
  }
}

export default Start;

function data(data: any) {
  throw new Error("Function not implemented.");
}
