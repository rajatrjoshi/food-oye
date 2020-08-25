const expressLayouts = require("express-ejs-layouts");
const express = require("express");

const app = express();




// Firebase JS Client SDK
const firebase = require("firebase");
// The web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA8MEAYpRA7E4eA1_cka8n0U6zmYXl9mz0",
    authDomain: "food-oye-v1.firebaseapp.com",
    databaseURL: "https://food-oye-v1.firebaseio.com",
    projectId: "food-oye-v1",
    storageBucket: "food-oye-v1.appspot.com",
    messagingSenderId: "912740141069",
    appId: "1:912740141069:web:bb793011183a3d52b66d44"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
// Firebase products used
const firestore = firebase.firestore();



// Middleware
// Static folder to serve html, css and imgs
app.use(express.static(__dirname + "/public"));
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