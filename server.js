require("dotenv").config();
const express = require("express");
const app = express();
const connectDb = require("./db/connect");
const cors = require("cors");
const PORT = process.env.PORT || 5000;
const multer = require("multer");
const path = require("path");
const Image = require("./models/schema");

app.use(express.json());
app.use(cors());
app.use(express.static("public"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/Images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

app.post("/upload", upload.single("file"), (req, res) => {
  Image.create({ image: req.file.filename })
    .then((result) => {
      res.json(result);
    })
    .catch((e) => {
      console.log(e);
    });
});

app.get("/getImage", async (req, res) => {
  try {
    const data = await Image.find();
    res.status(201).json(data);
  } catch (e) {
    res.status(404).send(e);
  }
});

app.get("/", (req, res) => {
  app.use(express.static(path.resolve(__dirname, "frontend", "dist")));
  res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
});

connectDb().then(() => {
  try {
    app.listen(PORT, () => {
      console.log(`http://localhost:${PORT}`);
    });
  } catch (e) {
    console.log(e);
  }
});
