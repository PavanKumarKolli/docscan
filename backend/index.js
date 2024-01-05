import con from "./db.js";
import express, { query } from "express";
import cors from "cors";
import multer from "multer";
// const uploads = multer({ dest: "/uploads" });
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});  


const upload = multer({ storage });
const app = express();
app.use(express.static('public'))
app.use(
  cors({
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());
app.listen(5000, () => {
  console.log("server connected");
});                  
app.post("/uploads", upload.single("file"), (req, res) => {
  if(req.file!==null){
    res.json(req.file.path)
  }
});
 