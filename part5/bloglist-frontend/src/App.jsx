import { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Login from "./components/Login";
import Create from "./components/Create";
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

      <Create
        blogs={blogs}
        setBlogs={setBlogs}
        setErrorMessage={setErrorMessage}
      />

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  );
}

export default App;
