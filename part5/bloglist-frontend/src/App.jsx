import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Create from "./components/Create";
import Togglable from "./components/Togglable";
import blogService from "./services/blogs";
import loginService from "./services/login";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs => {
      setBlogs(blogs);
    });
  }, []);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogappUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("loggedBlogappUser");
    blogService.setToken(null);
    setUser(null);
  }


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
        <Create
          blogs={blogs}
          setBlogs={setBlogs}
          setErrorMessage={setErrorMessage}
        />
      </Togglable>

      {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
        <Blog key={blog.id} blog={blog} blogs={blogs} setBlogs={setBlogs} />
      )}
    </div>
  );
}

export default App;
