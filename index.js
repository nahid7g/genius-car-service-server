const express = require("express");
const cors = require("cors");
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const port = process.env.PORT || 5000;
require("dotenv").config();

const app = express();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.uymz2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
	try {
		await client.connect();
		const serviceCollection = client.db("geniusCar").collection("service");
		app.get("/service",async(req,res) => {
			const query = {};
			const cursor = serviceCollection.find(query);
			const services = await cursor.toArray();
			res.send(services);
		});
		app.get("/service/:id",async(req,res) => {
			const id = req.params.id;
			const query = {_id: ObjectId(id)}
			const service = await serviceCollection.findOne(query);
			res.send(service)
		})
	}
	finally {
		// await client.close();
	}
}
run().catch(console.dir)


// Middleware
app.use(cors());
app.use(express.json());

app.get("/",(req,res) => {
	res.send("Running perfectly")
})

app.listen(port,() => {
	console.log("Listening to port",port)
})