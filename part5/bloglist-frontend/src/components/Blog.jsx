import { useState } from "react";

const Blog = ({ blog }) => {
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
        {blog.likes} likes
      </div>}
      {detailsVisible && <div>
        {blog.user.name}
      </div>}

    </div>
  );
};

export default Blog;
