import { FormEvent, useState } from "react";
import { useRecoilState } from "recoil";
import allHamsters from "../../Atoms/allHamsters";
import { fixUrl } from "../../utils";
// import { isValidElement, useState } from "react";

import {
  addOne,
  isValidString,
  isValidLoves,
  isValidFavFood,
  isValidAge,
} from "../helperFunctions/Helpers";

const AddHamster = () => {
  const [, setHamsters] = useRecoilState(allHamsters);
  const [name, setName] = useState<string>("");
  const [age, setAge] = useState(0);
  const [favFood, setFaveFood] = useState("");
  const [loves, setLoves] = useState("");
  const [imgName, setImgName] = useState("");

  const ageIsValid = isValidAge(age);
  const nameIsValid = isValidString(name);
  const lovesIsValid = isValidLoves(loves);
  const favFoodIsValid = isValidFavFood(favFood);
  // const imgIsValid = isValidImg(imgName);

  const formIsValid =
    nameIsValid && lovesIsValid && favFoodIsValid && ageIsValid;

  const validNameBorder = nameIsValid ? "3px solid green" : "2px solid red";

  const validLovesBorder = lovesIsValid ? "3px solid green" : "2px solid red";

  const validFoodBorder = favFoodIsValid ? "3px solid green" : "2px solid red";

  const validAgeBorder = ageIsValid ? "3px solid green" : "2px solid red";

  const handleNameChange = (e: string | any) => {
    setName(e.target.value);
  };
  const handleAgeChange = (e: number | any) => {
    if (e.target.valueAsNumber >= 0) setAge(e.target.valueAsNumber);
  };
  const handleFaveFoodChange = (e: string | any) => setFaveFood(e.target.value);
  const handleLovesChange = (e: string | any) => setLoves(e.target.value);
  const handleImgNameChange = (e: string | any) => setImgName(e.target.value);

  const data = {
    name: name,
    age: age,
    favFood: favFood,
    loves: loves,
    imgName: imgName,
    wins: 0,
    defeats: 0,
    games: 0,
  };

  const onClickPrevDefault = async (
    e: FormEvent<HTMLFormElement>,
    data: any
  ) => {
    e.preventDefault();
    if (!nameIsValid) {
    }

    addOne(data);

    const response = await fetch(fixUrl("/hamsters"));
    const newData = await response.json();
    setHamsters(newData);
  };

  return (
    <div>
      <section>
        <form
          className="add-hamster"
          onSubmit={(e) => onClickPrevDefault(e, data)}
        >
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={handleNameChange}
              style={{ border: validNameBorder }}
            />
            {!nameIsValid && <span className="error">name is required!</span>}
          </div>
          <div className="form-group">
            <input
              type="number"
              // 3lch makaybanch age f place holdere
              placeholder="Age"
              value={age}
              onChange={handleAgeChange}
              style={{ border: validAgeBorder }}
            />
            {!ageIsValid && <span className="error">age is required!</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Food"
              value={favFood}
              onChange={handleFaveFoodChange}
              style={{ border: validFoodBorder }}
            />
            {!favFoodIsValid && (
              <span className="error">favorit food is required!</span>
            )}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Loves"
              value={loves}
              onChange={handleLovesChange}
              style={{ border: validLovesBorder }}
            />
            {!lovesIsValid && <span className="error">Loves is required!</span>}
          </div>
          <div className="form-group">
            <input
              type="text"
              placeholder="Picture"
              value={imgName}
              onChange={handleImgNameChange}
            />
            <button type="submit" disabled={!formIsValid}>
              🖊️
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AddHamster;
