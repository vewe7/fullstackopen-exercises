import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import Notification from './components/Notification';
import Login from './components/Login';
import Create from './components/Create';
import Togglable from './components/Togglable';
import blogService from './services/blogs';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      console.log(user);
    }
  }, []);

  const createBlog = async (fields) => {
    const { title, author, url } = fields;

    try {
      const blog = await blogService.create({ title, author, url });
      setBlogs(blogs.concat(blog));

      setErrorMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    } catch {
      setErrorMessage("error adding blog");
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser');
    blogService.setToken(null);
    setUser(null);
  };

  const handleLike = async (blog) => {
    const response = await blogService.addLike(blog);

    setBlogs(blogs.map(b => b.id === response.id ? { ...b, likes: b.likes + 1 } : b));
  };

  const handleDelete = async (blog) => {
    if (window.confirm(`Remove ${blog.title} by ${blog.author}`)) {
      try {
        await blogService.deleteBlog(blog);

        setBlogs(blogs.filter(b => b.id !== blog.id));
      } catch {
        setErrorMessage(`error deleting ${blog.title} by ${blog.author}`);
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
      }
    }
  };

  if (user === null) {
    return (
      <div>
        <Notification message={errorMessage} />
        <Login
          setUser={setUser}
          setErrorMessage={setErrorMessage}
        />
      </div>
    );
  }

  return (
    <div>
      <Notification message={errorMessage} />

      <h2>blogs</h2>
      <p>{user.name} logged in</p>
      <button type="button" onClick={handleLogout}>logout</button>

      <Togglable buttonLabel="create new blog">
        <Create createBlog={createBlog} />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog
          key={blog.id}
          blog={blog}
          removable={blog.user.username === user.username}
          handleLike={() => handleLike(blog)}
          handleDelete={() => handleDelete(blog)}
          setErrorMessage={setErrorMessage}
        />
      )}
    </div>
  );
};

export default App;
