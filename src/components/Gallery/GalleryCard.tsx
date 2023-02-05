import "./hamsterCard.css";
import { NewHams } from "../../models/NewHams";
import { fixUrl } from "../../utils";
import Card from "../Battle/card";
import { useRecoilState } from "recoil";
import allHamsters from "../../Atoms/allHamsters";

interface Props {
  hamster: NewHams;
}
// Remove Hamster

const HamsterCard = ({ hamster }: Props) => {
  const [, setData] = useRecoilState<NewHams[]>(allHamsters);

  async function deleteAHamster(id: string) {
    const response = await fetch(fixUrl(`/hamsters/${id}`), {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: null,
    });

    if (response.status === 200) {
      async function getHamsters() {
        const response: Response = await fetch(fixUrl("/hamsters/"));
        const apiData: any = await response.json();

        setData(apiData as NewHams[]);
      }
      getHamsters();
    }
  }

  return (
    <div className="wrapper-gallery">
      <section>
        <div className="hamsterinfo">
          {hamster.imgName && (
            <img
              src={fixUrl(`/img/${hamster.imgName}`)}
              alt="Bild på hamster"
            />
          )}
          {hamster.name}
          <p>
            <b>Hobby: </b>
            {hamster.loves}
          </p>
          <p>
            <b>Favoritmat: </b>
            {hamster.favFood}
          </p>
          <Card competitor={hamster} />
          <button
            onClick={() => {
              deleteAHamster(hamster.id);
            }}
          >
            Remove Hamster
          </button>
        </div>
      </section>
    </div>
  );
};
export default HamsterCard;
