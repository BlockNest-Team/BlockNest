import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import multer from "multer";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import authRoutes from "./routes/auth.js";
import userRoutes from "./Routes/users.js";
import postRoutes from "./routes/posts.js";
import { register } from "./controllers/auth.js";
import { createPost } from "./controllers/post.js";
import { verifyToken } from "./middleware/auth.js";
/********fakedata*******/
import User from "./models/User.js";
import Post from "./models/post.js";
import { users, posts } from "./data/data.js";
/********fakedata*******/

// Using module so we havve toconfigurefilenames and directory names
// config

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "public/asssets"))); // local aSSSETS STORAGE PATH
// Ended Config

// file storage after upload config start
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/assets");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const upload = multer({ storage });
// file storage config end

/***** routes *****/
// routes with files
app.post("/auth/register", upload.single("picture"), register); // register route where first portion is route and second is middle ware and last is our logic(registering a user)
app.post("/post", verifyToken, upload.single("picture"), createPost);

/***** routes end *****/

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

// DB connection
const port = process.env.PORT || 6001;
mongoose
  .connect(process.env.CONNECTION_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    app.listen(port, () =>
      console.log(`Server running on port: ${port} and DB Connected`)
    );

  })
  .catch((error) => console.log(`${error.message} Error Connecting DB`));
