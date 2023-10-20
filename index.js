const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require('mongodb');
const ObjectId = require('mongodb').ObjectId;

// _middleware
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Brand Shop Server Running')
})


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.kejy0wy.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const brandShopDB = client.db("ShopDB");
        const brandCollection = brandShopDB.collection("brands");
        const productCollection = brandShopDB.collection("products");
        const userCollection = brandShopDB.collection("users");

        // Brand CRUD
        app.get("/brands", async (req, res) => {
            const cursor = brandCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get("/brands/:brandId", async (req, res) => {
            const id = parseInt(req.params.brandId);
            console.log(id);
            const query = { _id: id };
            const result = await brandCollection.findOne(query);
            res.send(result);
        })

        app.get("/brands/:brandId/products", async (req, res) => {
            const brandId = parseInt(req.params.brandId);
            const query = { brandId: brandId };
            const cursor = productCollection.find(query);
            const result = await cursor.toArray();
            res.send(result);
        })

        // Product CRUD
        app.get("/products", async (req, res) => {
            const cursor = productCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post("/products", async (req, res) => {
            const newProduct = req.body;
            const result = await productCollection.insertOne(newProduct);
            console.log(result);
            res.json(result);
        })

        app.get("/products/:productId", async (req, res) => {
            const id = req.params.productId;
            console.log(id);
            const query = { _id: new ObjectId(id) };
            const result = await productCollection.findOne(query);
            res.send(result);
        })

        app.put("/products/:productId", async (req, res) => {
            const id = req.params.productId;
            const filter = { _id: new ObjectId(id) };
            const options = { upsert: true };
            const updateProduct = req.body;
            const updateDoc = {
                $set: {
                    name: updateProduct.name,
                    image_url: updateProduct.image_url,
                    brand_name: updateProduct.brand_name,
                    type: updateProduct.type,
                    price: updateProduct.price,
                    rating: updateProduct.rating,
                    short_description: updateProduct.short_description,
                },
            };
            const result = await movies.updateOne(filter, updateDoc, options);
            res.send(result);
        })



        // User CRUD
        app.get("/users", async (req, res) => {
            const cursor = userCollection.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post("/users", async (req, res) => {
            const newUser = req.body;
            const result = await userCollection.insertOne(newUser);
            console.log(result);
            res.json(result);
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
