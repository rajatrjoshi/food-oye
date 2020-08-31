const expressLayouts = require("express-ejs-layouts");
const express = require("express");

const app = express();




// Firebase JS Client SDK
const firebase = require("firebase");
const firebaseConfig = require("./firebaseConfig.json")
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Firebase products used
const firestore = firebase.firestore();



// Middleware
// Static folder to serve css and js
app.use("/public", express.static(__dirname + "/public"));
// ejs
app.use(expressLayouts);
app.set("view engine", "ejs");
// Body parser
app.use(express.urlencoded({ extended: false }));
app.use(express.json());



//Routes
app.use("/restaurant", require("./routes/restaurant.js"));
app.use("/endpoints", require("./routes/endpoints.js"));




app.get
(
	"/",
	async (req, res) =>
	{
		const restaurants = await firestore
			.collection("restaurants")
			.orderBy("name", "asc")
			.get()
			.then
			(
				(querySnapshot) =>
				{
					let restaurantArr = []
					querySnapshot.forEach
					(
						(restaurant) => restaurantArr.push({ id: restaurant.id, ...restaurant.data() })
					);

					return restaurantArr;
				}
			);

		res.render("home-page", { restaurants });
	}
);




const PORT = process.env.PORT || 5000;
app.listen
(
	PORT,
	(err) =>
	{
		if(err)
			console.log(err);

		console.log(`Server started on port ${PORT}...`);
	}	
);