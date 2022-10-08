import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import Pusher from "pusher";
import dotenv from "dotenv";

import dbModel from "./dbModel.js";

// App config
const app = express();
const PORT = process.env.PORT || 8080;
dotenv.config();

const pusher = new Pusher({
  // appId: "1179222",
  // key: "2e5eeae87667a292e114",
  // secret: "1b592da0f263a00a5db5",
  // cluster: "eu",
  appId: "1243265",
  key: "821b56dd42122f94e780",
  secret: "b54763a2b646345187c3",
  cluster: "ap2",
  useTLS: true,
});

// Middleware
app.use(express.json());
app.use(cors());

// DB config
const connection_url = process.env.MONGO_URL;
mongoose.connect(connection_url, {
  useCreateIndex: true,
  useUnifiedTopology: true,
  useNewUrlParser: true,
});

mongoose.connection.once("open", () => {
  console.log("MongoDB has been successfuly connected!");

  const changeStream = mongoose.connection.collection("posts").watch();

  changeStream.on("change", (change) => {
    console.log("Change stream triggered...");
    console.log(change);
    console.log("End of change!");

    if (change.operationType === "insert") {
      console.log("Triggering push ***IMG UPLOAD***");

      const postDetails = change.fullDocument;
      pusher.trigger("posts", "inserted", {
        user: postDetails.user,
        caption: postDetails.caption,
        image: postDetails.image,
      });
    } else {
      console.log("Error triggering PUSHER");
    }
  });
});

// API routes
app.get("/", (req, res) => {
  res.status(200).send("Helloo");
});

app.post("/upload", (req, res) => {
  const body = req.body;

  dbModel.create(body, (err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(201).send(data);
    }
  });
});

app.get("/sync", (req, res) => {
  dbModel.find((err, data) => {
    if (err) {
      res.status(500).send(err);
    } else {
      res.status(200).send(data);
    }
  });
});

// Listeners
app.listen(PORT, () => {
  console.log(`Server is listening at PORT: ${PORT}`);
});
