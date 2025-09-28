import { useState } from 'react';
import blogService from '../services/blogs';

const Blog = ({ blog, removable, handleLike, handleDelete, setErrorMessage }) => {
  const [detailsVisible, setDetailsVisible] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  };

  const toggleDetails = () => {
    setDetailsVisible(!detailsVisible);
  };

  return (
    <div style={blogStyle} className="blog-container">
      <div className="blog-title-author">
        {blog.title} {blog.author}
        <button onClick={toggleDetails}>{detailsVisible ? 'hide' : 'view'}</button>
      </div>
      {detailsVisible && <div className="blog-url">
        {blog.url}
      </div>}
      {detailsVisible && <div className="blog-likes">
        {blog.likes} likes <button onClick={handleLike}>like</button>
      </div>}
      {detailsVisible && <div className="blog-user">
        {blog.user.name}
      </div>}
      {(detailsVisible && removable) && <div className="blog-remove">
        <button onClick={handleDelete}>remove</button>
      </div>}
    </div>
  );
};

export default Blog;
