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

        ////get db item this for home part
        app.get('/home', async (req, res) =>{
            const query = {};
            const cursor = serviceCollection.find(query)
            const result = await cursor.limit(3).toArray();
            res.send(result)
        });

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

        app.get('/review/:serviceName', async (req, res) => {
            const serviceName = req.params.serviceName;
            console.log(serviceName)
            const query = {serviceName:serviceName}
            console.log(query);
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        })
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