const express = require("express");
const firebase = require("firebase");
const firestore = firebase.firestore();

const router = express.Router();




router.post
(	
	"/dishRestDetails",
	async (req, res) =>
	{
		const dishArr = req.body.dishes;

		const details = [];
		for(let i = 0; i < dishArr.length; i++)
		{
			const dishId = dishArr[i];
			
			const dishDetails = await firestore
				.collection("dishes")
				.doc(dishId)
				.get()
				.then((querySnapshot) => querySnapshot.data());
			
			const restDetails = await firestore
				.collection("restaurants")
				.doc(dishDetails.rest_id)
				.get()
				.then((querySnapshot) => querySnapshot.data());

			details.push({ dishDetails, restDetails });
		}

		res.status(200).send({ "dishRestDetails": details });
	}
);




module.exports = router;