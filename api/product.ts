import fetch from "isomorphic-unfetch";

export const getProducts = async () => {
  const res = await fetch("http://localhost:3001/products");
  const data = await res.json();

  return data;
};
