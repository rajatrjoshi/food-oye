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
app.use(express.urlencoded({extended: false}));



//Routes
app.use("/restaurant", require("./routes/restaurant.js"));




app.get
(
	"/",
	async (req, res) =>
	{
		await firestore.collection("restaurants").orderBy("name", "asc").get().then
		(
			(querySnapshot) =>
			{
				let restaurants = []
				querySnapshot.forEach
				(
					(restaurant) => restaurants.push({ id: restaurant.id, ...restaurant.data() })
				);
				
				res.render("home-page", { restaurants });
			}
		).catch
		(
			(err) => console.log(err)
		);
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