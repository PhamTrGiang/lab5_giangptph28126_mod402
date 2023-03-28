const express = require("express");
const app = express();
const port = 3030;
const bodyParser = require("body-parser");
const multer = require("multer");
const fs = require("fs");
const mongoose = require("mongoose");
const uri =
  "mongodb+srv://giang:huNAGXZenvebYdgi@cluster0.r13gxca.mongodb.net/cp17301?retryWrites=true&w=majority";
const labModel = require("./labModel");

app.get("/lab", async (req, res) => {
  await mongoose.connect(uri).then(console.log("ket noi db thanh cong!"));

  try {
    const labs = await labModel.find();

    labModel.updateMany();
    labModel.updateOne({ ten: "Lab3" }, { ten: "Lab3 - 2023" });

    labModel.deleteMany({ ten: "Lab3" });
    labModel.deleteOne();

    console.log(labs);
    res.send(labs);
  } catch (err) {
    console.log(err);
  }
});

app.get("/addlab", async (req, res) => {
  await mongoose.connect(uri).then(console.log("ket noi db thanh cong!"));

  let lab = new labModel({
    title: "lab4",
    noidung: "bai tap them du lieu",
    //tailieu:2
  });
  lab.tailieu = 1;

  try {
    let kq = await lab.save();

    console.log(kq);

    let labs = await labModel.find();
    res.send(labs);
  } catch (error) {
    console.log(error);
  }
});

app.get("/dellab", async (req, res) => {
  await mongoose.connect(uri).then(console.log("ket noi db thanh cong!"));
  try {
    labModel.deleteMany({ title:'Lab 1' },console.log("delete thanh cong!"));
    const labs = await labModel.find();
    res.send(labs);
  } catch (err) {
    console.log(err);
  }
});

app.get("/editlab", async (req, res) => {
    await mongoose.connect(uri).then(console.log("ket noi db thanh cong!"));
    try {
        labModel.updateOne({ ten: "lab3" }, { ten: "Lab3 - 2023" });
      const labs = await labModel.find();
      res.send(labs);
    } catch (err) {
      console.log(err);
    }
  });

app.use(bodyParser.urlencoded({ extended: true }));

// SET STORAGE
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    dir = "./uploads";
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    let fileName = file.originalname;
    console.log(fileName);

    let arr = fileName.split(".");
    let newFileName = arr[0] + "-" + Date.now() + "." + arr[1];

    cb(null, newFileName);
  },
});

var upload = multer({
  storage: storage,
  limits: { fileSize: 1 * 1024 * 1024 },
});

app.post("/uploadfile", upload.single("myFile"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

//Uploading multiple files
app.post("/uploadmultiple", upload.array("myFiles", 12), (req, res, next) => {
  const files = req.files;
  if (!files) {
    const error = new Error("Please choose files");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(files);
});

app.post("/upload/photo", upload.single("image"), (req, res, next) => {
  const file = req.file;
  if (!file) {
    const error = new Error("Please upload a file");
    error.httpStatusCode = 400;
    return next(error);
  }
  res.send(file);
});

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/upload.html");
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
