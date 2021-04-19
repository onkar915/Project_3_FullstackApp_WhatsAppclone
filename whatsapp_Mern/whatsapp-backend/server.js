//importing
//iamdal
//Creating a API

// importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors"

//app confignoo
const app = express();
const port = process.env.PORT || 9000;

const pusher = new Pusher({
  appId: "1139795",
  key: "0db228770c7017211236",
  secret: "0cd2b099aa1d7b35bdc0",
  cluster: "eu",
  useTLS: true
});

// middleware
app.use(express.json());
app.use(cors());

//--cors headers allowing 
//reuqst to come form any endpoint
//we addmitin any kind of header everthing will be accepted
//app.use((req,res,next)=>{
   // res.setHeader("Access-Control-Allow-Origin","*");
    //res.setHeader("Access-Control-Allow-Headers","*");
    //next();
//});


// DB config
const connection_url =
  "mongodb+srv://user:AeG7oiwkLluOQZLh@cluster1.1eu71.mongodb.net/mongosdb?retryWrites=true&w=majority";
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// pusher
const db = mongoose.connection;

db.once("open", () => {
  console.log("DB connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log("A change occured", change);
///check the console
    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("message", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp: messageDetails.timestamp,
        
        received: messageDetails.received,
      });
    } else {
      console.log("Error triggering Pusher");
    }
  });
});

// api routes
app.get("/", (req, res) => res.status(200).send("hello world"));

app.get("/messages/sync", (req, res) => {
  Messages.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;
  Messages.create(dbMessage, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

// listen
app.listen(port, () => console.log(`Listening on localhost:${port}`));
