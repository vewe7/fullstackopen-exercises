import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, blogs, setBlogs }) => {
  console.log(blog);
  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5
  }

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  }

  const handleLike = async () => {
    const newBlog = await blogService.addLike(blog);

    setBlogs(blogs.map(b => b.id === newBlog.id ? { ...b, likes: b.likes + 1 } : b));
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{detailsVisible ? "hide" : "view"}</button>
      </div >
      {detailsVisible && <div>
        {blog.url}
      </div>}
      {detailsVisible && <div>
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>}
      {detailsVisible && <div>
        {blog.user.name}
      </div>}

    </div>
  );
};

export default Blog;
