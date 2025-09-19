import { useState } from "react";
import blogService from "../services/blogs";

const Create = ({ blogs, setBlogs, setErrorMessage }) => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlog = async (e) => {
    e.preventDefault();

    try {
      const blog = await blogService.create({ title, author, url });

      setBlogs(blogs.concat(blog));

      setErrorMessage(`a new blog ${title} by ${author} added`);
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);

      setTitle("");
      setAuthor("");
      setUrl("");
    } catch {
      setErrorMessage("username or password is incorrect.");
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000);
    }
  }

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <div>
        <label>
          title:
          <input
            type="text"
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          author:
          <input
            type="text"
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          url:
          <input
            type="url"
            value={url}
            onChange={({ target }) => setUrl(target.value)}
          />
        </label>
      </div>
      <button type="submit">create</button>
    </form>
  )

  return (
    <div>
      <h2>Create New</h2>
      {blogForm()}
    </div>
  );
}

export default Create;
