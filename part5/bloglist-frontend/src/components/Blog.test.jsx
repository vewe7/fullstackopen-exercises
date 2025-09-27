import { render, screen } from "@testing-library/react";
import Blog from "./Blog";

test("blog renders ONLY title and author by default", () => {
  const user = {
    id: "68cc81e4cf834f6bbb972964",
    username: "testuser",
    name: "test"
  }

  const blog = {
    id: "68d4fefb3d38eda5fd28e665",
    title: "test blog title",
    author: "blog author name",
    user: user,
    url: "https://www.example.com",
    likes: 5,
  }

  const { container } = render(<Blog blog={blog} user={user} />);

  const titleAuthorDiv = container.querySelector(".blog-title-author");
  expect(titleAuthorDiv).toHaveTextContent("test blog title");

  const urlDiv = container.querySelector(".blog-url");
  expect(urlDiv).toBeNull();

  const likesDiv = container.querySelector(".blog-likes");
  expect(likesDiv).toBeNull();
});
