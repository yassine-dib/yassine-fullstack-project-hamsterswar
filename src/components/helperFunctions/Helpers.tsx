import { Data, NewHams } from "../../models/NewHams";

const getAll = (data: string) => {
  try {
    fetch("/Hamsters", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("Error", error);
  }
};

const getRandom = (data: string) => {
  try {
    fetch("/Hamsters/random", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("Error", error);
  }
};

const getCutest = (data: string) => {
  try {
    fetch("/Hamsters/cutest", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("Error", error);
  }
};

// ADD A NEW HAMSTER
const addOne = (data: Data) => {
  try {
    fetch("/hamsters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Success:", data);
      });
  } catch (error) {
    console.log("Error", error);
  }
};

// DELETE
const DeleteHamster = (id: string) => {
  fetch(`/hamsters/${id}`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
  });
};

const changeData = (data: string) => {
  try {
    fetch("/:id", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
  } catch (error) {
    console.log("Error", error);
  }
};

const updateMatch = async (winner: NewHams, loser: NewHams) => {
  await fetch(`hamsters/${winner.id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      wins: winner.wins + 1,
      games: winner.games + 1,
    }),
  });

  await fetch(`hamsters/${loser.id}`, {
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
};

function isValidImg(imgName: string): boolean {
  if (
    imgName.length <= 7 ||
    !imgName.endsWith(".jpg") ||
    !imgName.endsWith(".png") ||
    !imgName.endsWith(".svg") ||
    !imgName.endsWith(".jpeg")
  ) {
    return false;
  }
  return true;
}

const isValidString = (name: string): boolean => {
  return name.length >= 3;
};
const isValidLoves = (loves: string): boolean => {
  return loves.length >= 3;
};
const isValidFavFood = (favFood: string): boolean => {
  return favFood.length >= 3;
};
const isValidAge = (age: number): boolean => {
  if (age < 0) return false;
  if (!Number.isInteger(age)) return false;
  return true;
};

export {
  DeleteHamster,
  addOne,
  getRandom,
  getCutest,
  getAll,
  changeData,
  updateMatch,
  isValidImg,
  isValidString,
  isValidLoves,
  isValidFavFood,
  isValidAge,
};