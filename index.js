const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express();
const port = process.env.PORT || 5000;


//middle ware
app.use(cors());
app.use(express.json());



//mongodb code 


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.y26223s.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });


//mongo db functions



app.get('/' , (req,res)=>{
    res.send('server is running');
});

app.listen(port, () => {
    console.log(`listening on port ${port}`);
    
})