import axios from 'axios';
const baseUrl = '/api/blogs';

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
}

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then(response => response.data);
}

const create = async (newObject) => {
  const config = {
    headers: { Authorization: token }
  }

  const response = await axios.post(baseUrl, newObject, config);
  return response.data;
}

const addLike = async (blog) => {
  console.log(blog);
  const response = await axios.put(`${baseUrl}/${blog.id}`, { ...blog, likes: blog.likes + 1, user: blog.user.id });

  return response.data;
}

export default { getAll, create, setToken, addLike };
