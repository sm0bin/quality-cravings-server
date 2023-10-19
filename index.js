const express = require('express');
const cors = require('cors');
require('dotenv').config();
const app = express();
const port = process.env.PORT || 5500;
const { MongoClient, ServerApiVersion } = require('mongodb');

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

        const foodDB = client.db("foodDB");
        const brands = foodDB.collection("brands");
        const products = foodDB.collection("products");
        const brandProducts = foodDB.collection("brandProducts");

        // Bulk data insert


        // const docs = [
        //     {
        //         "_id": 1,
        //         "name": "Cadbury",
        //         "image_url": "https://i.ibb.co/3pMTJ6V/Cadbury.png",
        //         "advertisement_images": [
        //             "https://i.ibb.co/5x3Lz3V/Cadbury-Ad1.jpg",
        //             "https://i.ibb.co/0Fg8Cj3/Cadbury-Ad2.jpg",
        //             "https://i.ibb.co/B2ZztwW/Cadbury-Ad3.jpg"
        //         ],
        //         "products": [
        //             {
        //                 "_id": 1,
        //                 "image_url": "https://i.ibb.co/j86Zxdq/Cadbury-Dairy-Milk.png",
        //                 "name": "Cadbury Dairy Milk",
        //                 "brand_name": "Cadbury",
        //                 "type": "Chocolate",
        //                 "price": 1.99,
        //                 "rating": 4.7,
        //                 "short_description": "Creamy and delicious milk chocolate bar."
        //             },
        //             {
        //                 "_id": 2,
        //                 "image_url": "https://i.ibb.co/dGv6HTj/Cadbury-Caramel.png",
        //                 "name": "Cadbury Caramel",
        //                 "brand_name": "Cadbury",
        //                 "type": "Chocolate",
        //                 "price": 2.49,
        //                 "rating": 4.5,
        //                 "short_description": "Smooth milk chocolate with a soft caramel center."
        //             },
        //             {
        //                 "_id": 3,
        //                 "image_url": "https://i.ibb.co/h7tvNrw/Cadbury-Oreo.png",
        //                 "name": "Cadbury Oreo",
        //                 "brand_name": "Cadbury",
        //                 "type": "Chocolate",
        //                 "price": 2.29,
        //                 "rating": 4.6,
        //                 "short_description": "Cadbury Dairy Milk with Oreo cookie pieces."
        //             },
        //             {
        //                 "_id": 4,
        //                 "image_url": "https://i.ibb.co/8M8qzvV/Cadbury-Fruit-Nut.png",
        //                 "name": "Cadbury Fruit & Nut",
        //                 "brand_name": "Cadbury",
        //                 "type": "Chocolate",
        //                 "price": 2.99,
        //                 "rating": 4.4,
        //                 "short_description": "Delicious milk chocolate with raisins and almonds."
        //             }
        //         ]
        //     },
        //     {
        //         "_id": 2,
        //         "name": "Coca-Cola",
        //         "image_url": "https://i.ibb.co/mT9PnZF/Coca-Cola.png",
        //         "advertisement_images": [
        //             "https://i.ibb.co/CtrN2zv/Coca-Cola-Ad1.jpg",
        //             "https://i.ibb.co/sWVjCSw/Coca-Cola-Ad2.jpg",
        //             "https://i.ibb.co/3BkwSRj/Coca-Cola-Ad3.jpg"
        //         ],
        //         "products": [
        //             {
        //                 "_id": 5,
        //                 "image_url": "https://i.ibb.co/JkbHjC2/Coca-Cola-Classic.png",
        //                 "name": "Coca-Cola Classic",
        //                 "brand_name": "Coca-Cola",
        //                 "type": "Soft Drink",
        //                 "price": 1.49,
        //                 "rating": 4.8,
        //                 "short_description": "The classic and refreshing cola."
        //             },
        //             {
        //                 "_id": 6,
        //                 "image_url": "https://i.ibb.co/JjtW6q7/Coca-Cola-Diet.png",
        //                 "name": "Coca-Cola Diet",
        //                 "brand_name": "Coca-Cola",
        //                 "type": "Soft Drink",
        //                 "price": 1.29,
        //                 "rating": 4.6,
        //                 "short_description": "Sugar-free, low-calorie cola for a lighter choice."
        //             },
        //             {
        //                 "_id": 7,
        //                 "image_url": "https://i.ibb.co/2YhjsV5/Coca-Cola-Zero-Sugar.png",
        //                 "name": "Coca-Cola Zero Sugar",
        //                 "brand_name": "Coca-Cola",
        //                 "type": "Soft Drink",
        //                 "price": 1.39,
        //                 "rating": 4.7,
        //                 "short_description": "Same great taste with zero sugar."
        //             },
        //             {
        //                 "_id": 8,
        //                 "image_url": "https://i.ibb.co/0rFtXxn/Coca-Cola-Cherry.png",
        //                 "name": "Coca-Cola Cherry",
        //                 "brand_name": "Coca-Cola",
        //                 "type": "Soft Drink",
        //                 "price": 1.59,
        //                 "rating": 4.5,
        //                 "short_description": "Cola with a hint of cherry flavor."
        //             }
        //         ]
        //     },
        //     {
        //         "_id": 3,
        //         "name": "KFC",
        //         "image_url": "https://i.ibb.co/zVrTLZD/KFC.png",
        //         "advertisement_images": [
        //             "https://i.ibb.co/J3LzQpd/KFC-Ad1.jpg",
        //             "https://i.ibb.co/QDS1QqT/KFC-Ad2.jpg",
        //             "https://i.ibb.co/8sJ1kVS/KFC-Ad3.jpg"
        //         ],
        //         "products": [
        //             {
        //                 "_id": 9,
        //                 "image_url": "https://i.ibb.co/vs1mbzK/KFC-Original-Recipe-Chicken.png",
        //                 "name": "KFC Original Recipe Chicken",
        //                 "brand_name": "KFC",
        //                 "type": "Fried Chicken",
        //                 "price": 5.99,
        //                 "rating": 4.9,
        //                 "short_description": "Crispy, seasoned fried chicken."
        //             },
        //             {
        //                 "_id": 10,
        //                 "image_url": "https://i.ibb.co/9g2yz5R/KFC-Zinger-Burger.png",
        //                 "name": "KFC Zinger Burger",
        //                 "brand_name": "KFC",
        //                 "type": "Burger",
        //                 "price": 4.99,
        //                 "rating": 4.7,
        //                 "short_description": "Spicy chicken fillet in a bun."
        //             },
        //             {
        //                 "_id": 11,
        //                 "image_url": "https://i.ibb.co/D9G5L49/KFC-Mashed-Potatoes.png",
        //                 "name": "KFC Mashed Potatoes",
        //                 "brand_name": "KFC",
        //                 "type": "Side Dish",
        //                 "price": 2.49,
        //                 "rating": 4.5,
        //                 "short_description": "Creamy mashed potatoes with gravy."
        //             },
        //             {
        //                 "_id": 12,
        //                 "image_url": "https://i.ibb.co/4Mm4M3K/KFC-Coleslaw.png",
        //                 "name": "KFC Coleslaw",
        //                 "brand_name": "KFC",
        //                 "type": "Side Dish",
        //                 "price": 1.99,
        //                 "rating": 4.4,
        //                 "short_description": "Classic coleslaw with a tangy twist."
        //             }
        //         ]
        //     },
        //     {
        //         "_id": 4,
        //         "name": "McDonald's",
        //         "image_url": "https://i.ibb.co/GPJXJYM/Mc-Donalds.png",
        //         "advertisement_images": [
        //             "https://i.ibb.co/1RFTWTg/Mc-Donalds-Ad1.jpg",
        //             "https://i.ibb.co/qnkMsxt/Mc-Donalds-Ad2.jpg",
        //             "https://i.ibb.co/3YBS3sq/Mc-Donalds-Ad3.jpg"
        //         ],
        //         "products": [
        //             {
        //                 "_id": 13,
        //                 "image_url": "https://i.ibb.co/rGgXHD7/Mc-Donalds-Big-Mac.png",
        //                 "name": "Big Mac",
        //                 "brand_name": "McDonald's",
        //                 "type": "Burger",
        //                 "price": 4.99,
        //                 "rating": 4.8,
        //                 "short_description": "Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun."
        //             },
        //             {
        //                 "_id": 14,
        //                 "image_url": "https://i.ibb.co/9sQfR1Y/Mc-Donalds-French-Fries.png",
        //                 "name": "French Fries",
        //                 "brand_name": "McDonald's",
        //                 "type": "Side Dish",
        //                 "price": 2.29,
        //                 "rating": 4.7,
        //                 "short_description": "Crispy and golden salted fries."
        //             },
        //             {
        //                 "_id": 15,
        //                 "image_url": "https://i.ibb.co/jbyrz2H/Mc-Donalds-Mc-Flurry.png",
        //                 "name": "McFlurry",
        //                 "brand_name": "McDonald's",
        //                 "type": "Dessert",
        //                 "price": 3.49,
        //                 "rating": 4.6,
        //                 "short_description": "Soft-serve ice cream with your favorite toppings."
        //             },
        //             {
        //                 "_id": 16,
        //                 "image_url": "https://i.ibb.co/nrnVCrX/Mc-Donalds-Chicken-Mc-Nuggets.png",
        //                 "name": "Chicken McNuggets",
        //                 "brand_name": "McDonald's",
        //                 "type": "Chicken",
        //                 "price": 3.99,
        //                 "rating": 4.5,
        //                 "short_description": "Tender, bite-sized chicken nuggets."
        //             }
        //         ]
        //     },
        //     {
        //         "_id": 5,
        //         "name": "Nestle",
        //         "image_url": "https://i.ibb.co/6B58VGF/Nestle.png",
        //         "advertisement_images": [
        //             "https://i.ibb.co/xLHD9ZP/Nestle-Ad1.jpg",
        //             "https://i.ibb.co/9v4GhL3/Nestle-Ad2.jpg",
        //             "https://i.ibb.co/d4Dkf7F/Nestle-Ad3.jpg"
        //         ],
        //         "products": [
        //             {
        //                 "_id": 17,
        //                 "image_url": "https://i.ibb.co/nCM9bTm/Nestle-Kit-Kat.png",
        //                 "name": "Kit Kat",
        //                 "brand_name": "Nestle",
        //                 "type": "Chocolate",
        //                 "price": 1.49,
        //                 "rating": 4.6,
        //                 "short_description": "Crispy wafer fingers covered in milk chocolate."
        //             },
        //             {
        //                 "_id": 18,
        //                 "image_url": "https://i.ibb.co/5MsKhnX/Nestle-Coffee-Crisp.png",
        //                 "name": "Coffee Crisp",
        //                 "brand_name": "Nestle",
        //                 "type": "Chocolate",
        //                 "price": 1.39,
        //                 "rating": 4.5,
        //                 "short_description": "Coffee-flavored chocolate with crispy layers."
        //             },
        //             {
        //                 "_id": 19,
        //                 "image_url": "https://i.ibb.co/xsbqtXC/Nestle-Aero.png",
        //                 "name": "Aero",
        //                 "brand_name": "Nestle",
        //                 "type": "Chocolate",
        //                 "price": 1.59,
        //                 "rating": 4.7,
        //                 "short_description": "Milk chocolate with bubbles for a light and airy texture."
        //             },
        //             {
        //                 "_id": 20,
        //                 "image_url": "https://i.ibb.co/k0Z9pvn/Nestle-Smarties.png",
        //                 "name": "Smarties",
        //                 "brand_name": "Nestle",
        //                 "type": "Chocolate",
        //                 "price": 1.29,
        //                 "rating": 4.4,
        //                 "short_description": "Colorful chocolate candy in a candy shell."
        //             }
        //         ]
        //     },
        //     {
        //         "_id": 6,
        //         "name": "PepsiCo",
        //         "image_url": "https://i.ibb.co/ZNPBPG5/PepsiCo.png",
        //         "advertisement_images": [
        //             "https://i.ibb.co/gD3ZL1y/PepsiCo-Ad1.jpg",
        //             "https://i.ibb.co/8Y1HDN9/PepsiCo-Ad2.jpg",
        //             "https://i.ibb.co/6Pc8gQB/PepsiCo-Ad3.jpg"
        //         ],
        //         "products": [
        //             {
        //                 "_id": 21,
        //                 "image_url": "https://i.ibb.co/LJhz3b0/Pepsi.png",
        //                 "name": "Pepsi",
        //                 "brand_name": "PepsiCo",
        //                 "type": "Soft Drink",
        //                 "price": 1.49,
        //                 "rating": 4.6,
        //                 "short_description": "Refreshing cola with a hint of citrus."
        //             },
        //             {
        //                 "_id": 22,
        //                 "image_url": "https://i.ibb.co/YBdsH6q/Doritos.png",
        //                 "name": "Doritos",
        //                 "brand_name": "PepsiCo",
        //                 "type": "Snack",
        //                 "price": 2.29,
        //                 "rating": 4.5,
        //                 "short_description": "Bold and crunchy tortilla chips."
        //             },
        //             {
        //                 "_id": 23,
        //                 "image_url": "https://i.ibb.co/QbLHQ4V/Lays.png",
        //                 "name": "Lay's Potato Chips",
        //                 "brand_name": "PepsiCo",
        //                 "type": "Snack",
        //                 "price": 1.99,
        //                 "rating": 4.7,
        //                 "short_description": "Classic potato chips for snacking."
        //             },
        //             {
        //                 "_id": 24,
        //                 "image_url": "https://i.ibb.co/9gBp5w4/Gatorade.png",
        //                 "name": "Gatorade",
        //                 "brand_name": "PepsiCo",
        //                 "type": "Sports Drink",
        //                 "price": 1.79,
        //                 "rating": 4.8,
        //                 "short_description": "Hydration and electrolytes for active lifestyles."
        //             }
        //         ]
        //     },
        //     {
        //         "_id": 7,
        //         "name": "Pran",
        //         "image_url": "https://i.ibb.co/pQxt91t/Pran.png",
        //         "advertisement_images": [
        //             "https://i.ibb.co/rFt3z2y/Pran-Ad1.jpg",
        //             "https://i.ibb.co/6bHXb8H/Pran-Ad2.jpg",
        //             "https://i.ibb.co/C2v7G32/Pran-Ad3.jpg"
        //         ],
        //         "products": [
        //             {
        //                 "_id": 25,
        //                 "image_url": "https://i.ibb.co/kD6mRrJ/Pran-Mango-Juice.png",
        //                 "name": "Pran Mango Juice",
        //                 "brand_name": "Pran",
        //                 "type": "Fruit Juice",
        //                 "price": 1.29,
        //                 "rating": 4.5,
        //                 "short_description": "Refreshing mango juice made from the finest mangoes."
        //             },
        //             {
        //                 "_id": 26,
        //                 "image_url": "https://i.ibb.co/9wX1Pmw/Pran-Pineapple-Juice.png",
        //                 "name": "Pran Pineapple Juice",
        //                 "brand_name": "Pran",
        //                 "type": "Fruit Juice",
        //                 "price": 1.39,
        //                 "rating": 4.6,
        //                 "short_description": "Tropical pineapple juice with a burst of flavor."
        //             },
        //             {
        //                 "_id": 27,
        //                 "image_url": "https://i.ibb.co/HGc4wSk/Pran-Mixed-Vegetable.png",
        //                 "name": "Pran Mixed Vegetable",
        //                 "brand_name": "Pran",
        //                 "type": "Canned Vegetables",
        //                 "price": 1.19,
        //                 "rating": 4.4,
        //                 "short_description": "A blend of mixed vegetables for versatile cooking."
        //             },
        //             {
        //                 "_id": 28,
        //                 "image_url": "https://i.ibb.co/jfn8TGx/Pran-Chutney.png",
        //                 "name": "Pran Chutney",
        //                 "brand_name": "Pran",
        //                 "type": "Condiment",
        //                 "price": 1.09,
        //                 "rating": 4.5,
        //                 "short_description": "Flavorful chutney for a variety of dishes."
        //             }
        //         ]
        //     },
        //     {
        //         "_id": 8,
        //         "name": "Starbucks",
        //         "image_url": "https://i.ibb.co/ZMs1DMV/Starbucks.png",
        //         "advertisement_images": [
        //             "https://i.ibb.co/F5W5nWd/Starbucks-Ad1.jpg",
        //             "https://i.ibb.co/Vv19dRt/Starbucks-Ad2.jpg",
        //             "https://i.ibb.co/nLJy6wK/Starbucks-Ad3.jpg"
        //         ],
        //         "products": [
        //             {
        //                 "_id": 29,
        //                 "image_url": "https-//i.ibb.co/1mJFwMc/Starbucks-Coffee.png",
        //                 "name": "Starbucks Coffee",
        //                 "brand_name": "Starbucks",
        //                 "type": "Coffee",
        //                 "price": 3.49,
        //                 "rating": 4.7,
        //                 "short_description": "Rich and aromatic coffee brewed to perfection."
        //             },
        //             {
        //                 "_id": 30,
        //                 "image_url": "https://i.ibb.co/YcJwRg8/Starbucks-Caramel-Macchiato.png",
        //                 "name": "Starbucks Caramel Macchiato",
        //                 "brand_name": "Starbucks",
        //                 "type": "Coffee",
        //                 "price": 4.29,
        //                 "rating": 4.8,
        //                 "short_description": "Espresso with steamed milk and caramel drizzle."
        //             },
        //             {
        //                 "_id": 31,
        //                 "image_url": "https://i.ibb.co/tYJ2RQV/Starbucks-Frappuccino.png",
        //                 "name": "Starbucks Frappuccino",
        //                 "brand_name": "Starbucks",
        //                 "type": "Coffee",
        //                 "price": 4.99,
        //                 "rating": 4.6,
        //                 "short_description": "Iced and blended coffee with a variety of flavors."
        //             },
        //             {
        //                 "_id": 32,
        //                 "image_url": "https://i.ibb.co/hBSzQV7/Starbucks-Pastries.png",
        //                 "name": "Starbucks Pastries",
        //                 "brand_name": "Starbucks",
        //                 "type": "Pastry",
        //                 "price": 2.49,
        //                 "rating": 4.5,
        //                 "short_description": "Delicious pastries to complement your coffee."
        //             }
        //         ]
        //     }
        // ]
        // const options = { ordered: true };
        // const result = await brandProducts.insertMany(docs, options);


        // ------------------------------

        app.get("/brands", async (req, res) => {
            const cursor = brands.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.get("/brands/:brandId", async (req, res) => {
            const id = parseInt(req.params.brandId);
            console.log(id);
            const query = { _id: id };
            const result = await brandProducts.findOne(query);
            res.send(result);
        })

        app.get("/brands/:brandId/products/:productID", async (req, res) => {
            const brandId = parseInt(req.params.brandId);
            const productID = parseInt(req.params.productID);

            const brand = await brandProducts.findOne({ _id: brandId });

            if (brand) {
                const product = brand.products.find(product => product._id === productID);

                if (product) {
                    res.send(product);
                } else {
                    res.status(404).send("Product not found");
                }
            } else {
                res.status(404).send("Brand not found");
            }
        })

        app.get("/products", async (req, res) => {
            const cursor = products.find();
            const result = await cursor.toArray();
            res.send(result);
        })

        app.post("/products", async (req, res) => {
            const newProduct = req.body;
            const result = await products.insertOne(newProduct);
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
