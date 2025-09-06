const mongoose = require("mongoose");

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
});

blogSchema.set("toJSON", {
  transform: (document, blog) => {
    blog.id = blog._id.toString();
    delete blog._id;
    delete blog.__v;
  }
});

module.exports = mongoose.model("Blog", blogSchema);
