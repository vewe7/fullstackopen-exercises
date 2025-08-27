const dummy = (blogs) => {
  return 1;
};

const totalLikes = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0);
};

const favoriteBlog = (blogs) => {
  if (blogs.length == 0)
    return null;

  return blogs.reduce((prev, blog) =>
    prev.likes < blog.likes ? blog : prev, blogs[0]);
};

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog
};
