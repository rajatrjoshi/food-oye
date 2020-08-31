const expressLayouts = require("express-ejs-layouts");
require('dotenv').config();
const express = require("express");

const app = express();




// Firebase Node.js Admin SDK
const firebase = require("firebase-admin");
const key = {
	"type": process.env.TYPE,
	"project_id": process.env.PROJECT_ID,
	"private_key_id": process.env.PRIVATE_KEY_ID,
	"private_key": process.env.PRIVATE_KEY.replace(/\\n/g, "\n"),
	"client_id": process.env.CLIENT_ID,
	"client_email": process.env.CLIENT_EMAIL,
	"auth_uri": process.env.AUTH_URI,
	"token_uri": process.env.TOKEN_URI,
	"auth_provider_x509_cert_url": process.env.AUTH_PROVIDER,
	"client_x509_cert_url": process.env.CLIENT_URL
}
//Initialize Firebase app
firebase.initializeApp({
  credential: firebase.credential.cert(key),
  databaseURL: "https://food-oye-d8e3b.firebaseio.com"
});
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