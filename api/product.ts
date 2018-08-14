import fetch from "isomorphic-unfetch";

export const getProducts = async () => {
  const res = await fetch("http://localhost:3001/products");
  const data = await res.json();

  return data;
};

export const getProductById = async (key: string) => {
  const res = await fetch(`http://localhost:3001/products/${key}`);
  const data = await res.json();

  return data[0];
};
