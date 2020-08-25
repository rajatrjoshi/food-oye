const express = require("express");
const firebase = require("firebase");
const firestore = firebase.firestore();

const router = express.Router();




router.get
(
	"/:restaurantId",
	async (req, res) =>
	{
		let restId = req.params.restaurantId;

		await firestore.collection("restaurants").doc(restId).get().then
		(
			async (restDetailsDoc) =>
			{
				const restDetails = restDetailsDoc.data();

				await firestore.collection("categories").where("rest_id", "==", restId).orderBy("name", "asc").get().then
				(
					(querySnapshot) =>
					{
						let categories = [];
						querySnapshot.forEach
						(
							(category) => categories.push({ id: category.id, ...category.data() })
						);

						res.render("restaurant-home", { restDetails, categories });
					}
				).catch
				(
					(err) => console.log(err)
				);
			}
		).catch
		(
			(err) => console.log(err)
		);
	}
);


router.get
(
	"/dishes/:categoryId",
	async (req, res) =>
	{
		const categoryId = req.params.categoryId;

		await firestore.collection("categories").doc(categoryId).get().then
		(
			async (categoryDoc) =>
			{
				const categoryDetails = categoryDoc.data();

				await firestore.collection("restaurants").doc(categoryDetails.rest_id).get().then
				(
					async (restaurantDetailsDoc) =>
					{
						const restaurantDetails = restaurantDetailsDoc.data();

						await firestore.collection("dishes").where("category_id", "==", categoryId).orderBy("name", "asc").get().then
						(
							(dishesQuerySnapshot) =>
							{
								let dishes = [];
								dishesQuerySnapshot.forEach
								(
									(dish) => dishes.push({ id: dish.id, ...dish.data() })
								);

								res.render("dishes", { restaurantDetails, categoryDetails, dishes });
							}
						).catch
						(
							(err) => console.log(err)
						);
					}
				).catch
				(
					(err) => console.log(err)
				);
			}
		).catch
		(
			(err) => console.log(err)
		);
	}
);




module.exports = router;