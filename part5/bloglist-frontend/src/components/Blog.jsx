import { useState } from "react";
import blogService from "../services/blogs";

const Blog = ({ blog, user, blogs, setBlogs, setErrorMessage }) => {
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
    const response = await blogService.addLike(blog);

    setBlogs(blogs.map(b => b.id === response.id ? { ...b, likes: b.likes + 1 } : b));
  }

  const handleDelete = async () => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog);

        setBlogs(blogs.filter(b => b.id !== blog.id));
      } catch {
        setErrorMessage(`error deleting ${blog.title} by ${blog.author}`);
        setTimeout(() => {
          setErrorMessage(null)
        }, 5000);
      }
    }
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
      {(detailsVisible && blog.user.username === user.username) && <div>
        <button onClick={handleDelete}>remove</button>
      </div>}

    </div>
  );
};

export default Blog;
