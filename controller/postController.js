const { User } = require("../models/authModel");
const { Post } = require("../models/postModel");
const catchAsyncError = require("../middleware/catchAsyncError");
var fs = require("fs");
var path = require("path");
exports.createPost = catchAsyncError(async (req, res) => {
  const { uid, name } = req.body;
  User.findOne({ _id: uid }, (err, user) => {
    if (!user)
      return res.status(400).json({
        success: false,
        message: "There is no such user",
      });
  });
  console.log(req.file);
  let obj = {
    name: req.body.name,
    uid: req.body.uid,
    img: {
      data: fs.readFileSync(
        path.join(__dirname + "../../uploads/" + req.file.filename)
      ),
      contentType: req.file.mimetype,
    },
  };
  const post = new Post(obj);
  post.save((err, item) => {
    if (err) {
      console.log(err);
    } else
      return res.status(200).json({
        success: true,
        message: "file uploaded successfully",
        img: item.img,
      });
  });
});

exports.allPosts = catchAsyncError(async (req, res) => {
  const id = req.query.id;
  const name = req.query.name;
  console.log(id, name);
  if (name == undefined) {
    Post.find({ uid: id }, (err, posts) => {
      if (err)
        return res.status(400).json({ success: false, message: "wrong uid" });
      else {
        const li = [];

        for (i = 0; i < posts.length; i++) {
          let obj = {
            name: posts[i]["name"],
            contentType: posts[i].img.contentType,
            img: posts[i].img.data.toString("base64"),
          };
          li.push(obj);
        }
        return res
          .status(200)
          .json({ success: true, message: "posts found", posts: li });
      }
    });
  } else {
    Post.find(
      { uid: id, name: { $regex: name, $options: "i" } },
      (err, posts) => {
        if (err)
          return res.status(400).json({ success: false, message: "wrong uid" });
        else {
          const li = [];

          for (i = 0; i < posts.length; i++) {
            let obj = {
              name: posts[i]["name"],
              contentType: posts[i].img.contentType,
              img: posts[i].img.data.toString("base64"),
            };
            li.push(obj);
          }
          return res
            .status(200)
            .json({
              success: true,
              message: "found post containing " + name,
              posts: li,
            });
        }
      }
    );
  }
});
