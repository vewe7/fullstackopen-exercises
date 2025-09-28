import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Blog from "./Blog";

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

test("blog renders ONLY title and author by default", () => {
  const { container } = render(<Blog blog={blog} removable={false} />);

  const titleAuthorDiv = container.querySelector(".blog-title-author");
  expect(titleAuthorDiv).toHaveTextContent("test blog title");

  const urlDiv = container.querySelector(".blog-url");
  expect(urlDiv).toBeNull();

  const likesDiv = container.querySelector(".blog-likes");
  expect(likesDiv).toBeNull();
});

test("blog URL and number of likes is shown when button is clicked to expand details", async () => {
  const { container } = render(<Blog blog={blog} removable={false} />);

  const mockUser = userEvent.setup();
  const button = screen.getByText("view");
  await mockUser.click(button);

  const urlDiv = container.querySelector(".blog-url");
  expect(urlDiv).toHaveTextContent("https://www.example.com");

  const likesDiv = container.querySelector(".blog-likes");
  expect(likesDiv).toHaveTextContent("5 likes");
});

test("event handler is called twice when the like button is clicked twice", async () => {
  const mockHandler = vi.fn();
  const { container } = render(<Blog blog={blog} removable={false} handleLike={mockHandler} />);

  const mockUser = userEvent.setup();

  const viewButton = screen.getByText("view");
  await mockUser.click(viewButton);

  const likeButton = screen.getByText("like");
  await mockUser.click(likeButton);
  await mockUser.click(likeButton);

  expect(mockHandler.mock.calls).toHaveLength(2);
});
