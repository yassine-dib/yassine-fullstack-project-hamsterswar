import express from "express";
import getDatabase from "../database.js";

const router = express.Router();
const db = getDatabase();

// Get all hamsters
router.get("/", async (req, res) => {
  try {
    let snapshot = await db
      .collection("HamstersObjekt")
      .orderBy("wins", "desc")
      .get();

    let winner;
    let allHamsters = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      allHamsters.push(data);
      const wins = data.wins || 0;
      const defeats = data.defeats || 0;
      const difference = wins - defeats;

      if (!winner || difference > winner.wins - winner.defeats) {
        winner = data;
      }
    });

    if (winner) {
      res.send(winner);
    } else {
      const randomHamster =
        allHamsters[Math.floor(Math.random() * allHamsters.length)];
      res.send(randomHamster);
    }
  } catch (error) {
    console.log("An error occured!" + error.message);
    res.status(500).send(error.message);
  }
});

export default router;
