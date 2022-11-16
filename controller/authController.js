const { User } = require("../models/authModel");
const { Post } = require("../models/postModel");
const catchAsyncError = require("../middleware/catchAsyncError");

exports.registerUser = catchAsyncError(async (req, res) => {
  let newUser = new User(req.body);
  let user = await User.findOne({ email: newUser.email });

  if (user) {
    res
      .status(400)
      .json({ success: false, message: "User email already exist" });
  }

  newUser.save((err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ success: false });
    }
    res.status(200).json({
      success: true,
      userId: doc._id,
    });
  });
});

exports.loginUser = catchAsyncError(async (req, res) => {
  let user = await User.findOne({ email: req.body.email });

  User.findOne({ email: req.body.email }, async (err, user) => {
    if (!user)
      return res.status(401).json({
        success: false,
        message: " Auth failed ,email not found",
      });
    let li = [];
    let posts = await Post.find({ uid: user._id });
    for (i = 0; i < posts.length; i++) {
      let obj = {
        name: posts[i].name,
        contentType: posts[i].img.contentType,
        img: posts[i].img.data.toString("base64"),
      };
      li.push(obj);
    }

    user.comparepassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.status(401).json({
          success: false,
          message: "password doesn't match",
        });
      else
        return res.status(200).json({
          success: true,
          message: "Logged in successfully",
          id: user._id,
          posts: li,
        });
    });
  });
});
