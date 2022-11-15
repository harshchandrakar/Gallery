const express = require("express");
const multer = require("multer");
const { createPost, allPosts } = require("../controller/postController");
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, new Date().toISOString().replace(/:/g, "-") + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const upload = multer({ storage: storage, fileFilter: fileFilter });
const router = express.Router();

router.route("/upload/post").post(upload.single("img"), createPost);
router.route("/all/post").get(allPosts);
module.exports = router;
