import express from "express";
import getDatabase from "../database.js";

const router = express.Router();
const db = getDatabase();

// Get all hamsters
router.get("/", async (req, res) => {
  try {
    let getHamsters = await db
      .collection("HamstersObjekt")
      .orderBy("wins", "desc")
      .get();

    // won at least once
    const winningHamsters = [];
    getHamsters.forEach((doc) => {
      const data = doc.data();
      if (data.wins > 0) {
        winningHamsters.push(data);
      }
    });

    res.send(winningHamsters);
  } catch (error) {
    console.log("An error occured!" + error.message);
    res.status(500).send(error.message);
  }
});

export default router;
