const express = require("express");
const mongodb = require("mongodb");
require("dotenv").config()
const cors=require("cors")
const mongoClient = mongodb.MongoClient;
const objectId = mongodb.ObjectID;

const app = express();
const dbURL = process.env.db_URL||"mongodb://127.0.0.1:27017";

app.use(express.json());
app.use(cors())
// mentors db
app.get("/mentors", async (req, res) => {
  try {
    let clientInfo = await mongoClient.connect(dbURL);
    let db = clientInfo.db("mentorsAssigning");
    let data = await db.collection("mentors").find().toArray();
    res.status(200).json({ data });
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

// students db
app.get("/students", async (req, res) => {
    try {
      let clientInfo = await mongoClient.connect(dbURL);
      let db = clientInfo.db("mentorsAssigning");
      let data = await db.collection("students").find().toArray();
      res.status(200).json({ data });
      clientInfo.close();
    } catch (error) {
      console.log(error);
      res.send(500);
    }
  });

// add mentors
app.post("/mentors", async (req, res) => {

  try {
    let clientInfo = await mongoClient.connect(dbURL);
    let db = clientInfo.db("mentorsAssigning");
    let data = await db.collection("mentors").insertOne(req.body);
    res.status(200).json({ message: "mentor created" });
    clientInfo.close();
  } catch (error) {
    console.log(error);
    res.send(500);
  }
});

// add students
app.post("/students", async (req, res) => {
    
    try {
      let clientInfo = await mongoClient.connect(dbURL);
      let db = clientInfo.db("mentorsAssigning");
      let data = await db.collection("students").insertOne(req.body);
      res.status(200).json({ message: "student created" });
      clientInfo.close();
    } catch (error) {
      console.log(error);
      res.send(500);
    }
  });


  app.listen(3000,(err)=>{
      if(err) throw err;
      console.log("Listenign to port 3000")
  })

//   assign students to mentors

app.post("/assign",async (req,res)=>{
    try {
        let clientInfo = await mongoClient.connect(dbURL);
        let db = clientInfo.db("mentorsAssigning");
        let data = await db.collection("StudentsMentorsAssigning").insertOne(req.body);
        res.status(200).json({ message: "student Assigned to mentor" });
        clientInfo.close();
      } catch (error) {
        console.log(error);
        res.send(500);
      }
})

app.put("/:name",async(req,res)=>{
    try{
        let clientInfo=await mongoClient.connect(dbURL)
        let db=clientInfo.db("mentorsAssigning");
        let data=await db.collection("StudentsMentorsAssigning").updateOne({selected_mentor:req.params.name},{$set:req.body})
        res.status(200).json({message:"Updated"})
    }catch(error){
        console.log(error)
        res.send(500)
    }
})


