import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";
import EmployeeRoute from "./routes/EmployeeRoute.js";
import UserRoute from "./routes/UserRoute.js";
// import RedisRoute from "./routes/RedisRoute.js";
// import Redis from "./redis/index.js";
// import { getEmployee } from "./controllers/EmployeeController.js";

dotenv.config();
const app = express();

mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONGOURL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on("error", (error) => console.log(error));
db.once("open", () => console.log("Database Connected..."));

app.use(bodyParser.json());
app.use(cors({ credentials: true }));
app.use(cookieParser());
app.use(express.json());
app.use(UserRoute);
app.use(EmployeeRoute);
// app.use(RedisRoute);

// app.get("/cache", async (req, res) => {
//   console.log("Success fetch from database");

//   const redis_key = "cache";

//   const { reply } = await Redis.get(redis_key);

//   if (reply) {
//     // cache available
//     res.status(200).send(reply);
//   } else {
//     // get data form db
//     const dataFromDb = {
//       success: true,
//       message: "success fetch data",
//       data :
//     };

//     // set redis cache
//     Redis.set(redis_key, JSON.stringify(dataFromDb));

//     res.status(200).send(dataFromDb);
//   }
// });

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => console.log("Server up and running ..."));
