const express = require("express");
const firebase = require("firebase-admin");
const firestore = firebase.firestore();

const router = express.Router();




router.get
(
	"/home/:restaurantId",
	async (req, res) =>
	{
		let restId = req.params.restaurantId;

		const restDetails = await firestore
		.collection("restaurants")
		.doc(restId)
		.get()
		.then((querySnapshot) => querySnapshot.data());
		
		const categories = await firestore
		.collection("categories")
		.where("rest_id", "==", restId)
		.orderBy("name", "asc")
		.get()
		.then
		(
			(querySnapshot) =>
			{
				let categoryArr = [];
				querySnapshot.forEach
				(
					category => categoryArr.push({ id: category.id, ...category.data() })
				);

				return categoryArr;
			}
		);
		
		res.render("restaurant-home", { restDetails, categories });
	}
);


router.get
(
	"/dishes/:categoryId",
	async (req, res) =>
	{
		const categoryId = req.params.categoryId;
		
		const categoryDetails = await firestore
			.collection("categories")
			.doc(categoryId)
			.get()
			.then(e => e.data());
		
		const restaurantDetails = await firestore
			.collection("restaurants")
			.doc(categoryDetails.rest_id)
			.get()
			.then(e => e.data());
		
		const dishes = await firestore
			.collection("dishes")
			.where("category_id", "==", categoryId)
			.orderBy("name", "asc")
			.get()
			.then
			(
				(querySnapshot) =>
				{
					let dishArr = [];
					querySnapshot.forEach
					(
						dish => dishArr.push({ id: dish.id, ...dish.data() })
					);

					return dishArr;
				}
			);
			
		res.render("dishes", { restaurantDetails, categoryDetails, dishes });
	}
);


router.get
(
	"/checkout",
	(req, res) =>
	{
		res.render("checkout");
	}
);




module.exports = router;