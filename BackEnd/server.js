//importing
import express from "express";
import mongoose from "mongoose";
import Messages from "./dbMessages.js";
import Pusher from "pusher";
import cors from "cors";

//app config
const app = express();
const port = process.env.PORT || 9000;


//pusher for real time updation
const pusher = new Pusher({
  appId: "1848749",
  key: "5dad1c29f09dcee0dbf6",
  secret: "98e498acd01d466f133b",
  cluster: "ap2",
  useTLS: true,
});

const db = mongoose.connection;
db.once("open", () => {
  console.log("DB is connected");

  const msgCollection = db.collection("messagecontents");
  const changeStream = msgCollection.watch();

  changeStream.on("change", (change) => {
    console.log(change);

    if (change.operationType === "insert") {
      const messageDetails = change.fullDocument;
      pusher.trigger("messages", "inserted", {
        name: messageDetails.name,
        message: messageDetails.message,
        timestamp:messageDetails.timestamp,
        received:messageDetails.received,
      });
    } else {
      console.log("Error triggered Pusher");
    }
  });
});

//middleware
app.use(express.json());
app.use(cors())


//DB congifgure
const connection_url =
  "mongodb+srv://admin:sandeepwhatsapppasscod@cluster0.3jlsh.mongodb.net/whatsappdb?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(connection_url);
//???

// api routes
app.get("/", (req, res) => {
  res.status(200);
  res.send("hello world");
});

//posting the messages
app.post("/messages/new", (req, res) => {
  const dbMessage = req.body;

  Messages.create(dbMessage)
    .then((result) => {
      res.status(201).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//getting all the messages
app.get("/messages/sync", (req, res) => {
  Messages.find()
    .then((result) => {
      res.status(200).send(result);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});

//listen
app.listen(port, () => {
  console.log(`server running on the port  ${port}`);
});
