import { withRouter, SingletonRouter } from "next/router";
import React from "react";

import Header from "../../components/layout/Header";

import {
  ProductProvider,
  ProductConnect
} from "../../controller/ProductController";
import { Map } from "immutable";

import { Wrapper, H1, Price, CartButton } from "./styles";

interface IProductPage {
  router: SingletonRouter;
  productsById: Map<string, { name: string; price: number }>;
  data: {
    key: string;
  };
}

class Container extends React.Component<IProductPage> {
  public render() {
    const { productsById, data } = this.props;
    const product = productsById.get(data.key);
    if (!product) {
      return <div />;
    }
    return (
      <Wrapper>
        <Header />
        <H1>{product.name}</H1>
        <Price>Product price = {product.price}</Price>
        <CartButton>Add to cart</CartButton>
      </Wrapper>
    );
  }
}

const IndexContainer = ProductConnect(Container);

class Product extends React.Component<any> {
  public static async getInitialProps(context): Promise<any> {
    try {
      const res = await fetch(
        `http://localhost:3001/products/${context.query.key}`
      );
      const data = await res.json();
      return {
        data: data[0],
        query: context.query
      };
    } catch (error) {
      console.log(error);
      return {
        error
      };
    }
  }

  constructor(props) {
    super(props);
    props.getProductById(props.data);
  }

  public render() {
    return <IndexContainer {...this.props} />;
  }
}

export default ProductProvider(withRouter(Product));
