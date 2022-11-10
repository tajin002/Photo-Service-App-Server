const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const { query } = require('express');
const app = express();
require('dotenv').config();
const port = process.env.PORT || 5000;


//middle ware
app.use(cors());
app.use(express.json());



//mongodb code 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y26223s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//mongo db functions
async function run(){
    try{
        const serviceCollection = client.db('photoGraphy').collection('services');
        const reviewCollection = client.db('photoGraphy').collection('review')
        const homeCollection = client.db('photoGraphy').collection('home')



        ////get db item this for home part
        app.get('/home', async (req, res) =>{
            const query = {};
            const cursor = homeCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        });

        app.post('/home' , async(req,res)=>{
            const product = req.body
            const result = await homeCollection.insertOne(product)
            console.log(result)
            res.send(result)

        })

         //get db item this for services part
         app.get('/services', async (req, res) =>{
            const query = {};
            const cursor = serviceCollection.find(query)
            const result = await cursor.toArray();
            res.send(result)
        });
        app.get('/services/:id' , async(req,res)=>{
            const id = req.params.id;
            const query = {_id : ObjectId(id)};
            const service = await serviceCollection.findOne(query);
            res.send(service);
        });

        //get review for services
        app.get('/review' , async(req,res)=>{
            const query = {}
            const cursor = reviewCollection.find(query);
            const result = await cursor.toArray()
            res.send(result)
        })

        app.get('/review/:name', async (req, res) => {
            const name = req.params.name
            const query = {name}
            const review = await reviewCollection.find(query).toArray();
            res.send(review);
        });

        app.post ('/review' , async (req, res) =>{
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            console.log(result);

            res.send(result);
        });

        app.patch('/review/:id', async(req,res)=>{
            const id = req.params.id;
            const post = req.body.post
            const query = {_id:ObjectId(id)}
        
            const updatedDoc = {
                $set:{
                    post:post
                }
            }
            const result = await reviewCollection.updateOne(query,updatedDoc)
            console.log(query , post , id , result);
            res.send(result)
        })

        app.delete('/review/:id' , async(req,res)=>{
            const id =req.params.id
            const query = {_id : ObjectId(id)}
            const result = await reviewCollection.deleteOne(query);
            console.log(result)
            res.send(result);
        })

        //post api create to item added  
    }
    finally{

    }
}
run().catch(error=>console.log(error))



app.get('/' , (req,res)=>{
    res.send('server is running');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
    
})