import express from "express";
import getDatabase from "../database.js";

const router = express.Router();
const db = getDatabase();

//get 5 losing hamsters
router.get('/', async (req, res) => {

	try {
		let getHamsters = await db.collection('HamstersObjekt').orderBy('defeats', 'desc').limit(5).get();

		// Hamsters that lost at least once
		const losingHamsters = [];
		getHamsters.forEach(doc => {
			const data = doc.data();
			if(data.defeats > 0){
				losingHamsters.push(data);
			}
		});
	
		res.send(losingHamsters);
	}
	
	catch(error) {
		console.log('An error occured!' + error.message);
		res.status(500).send(error.message);
	}
});

export default router;