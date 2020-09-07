const express = require("express");
const firebase = require("firebase-admin");
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
			
			let dishDetails = await firestore
				.collection("dishes")
				.doc(dishId)
				.get()
				.then((querySnapshot) => querySnapshot.data());

			const rest_id = dishDetails.rest_id;

			dishDetails = {
				id: dishId,
				name: dishDetails.name,
				price: dishDetails.price
			};
			
			let restDetails = await firestore
				.collection("restaurants")
				.doc(rest_id)
				.get()
				.then((querySnapshot) => querySnapshot.data());

			restDetails = { name: restDetails.name };

			details.push({ dishDetails, restDetails });
		}

		res.status(200).send({ "dishRestDetails": details });
	}
);




module.exports = router;