import { withRouter, SingletonRouter } from "next/router";
import React from "react";
import fetch from "isomorphic-unfetch";

import Header from "../../components/layout/Header";

import {
  ProductProvider,
  ProductConnect
} from "../../controller/ProductController";
import { CartConnect, CartProvider } from "../../controller/CartController";

import { Map } from "immutable";

import { Wrapper, H1, Price, CartButton } from "./styles";

interface IProductPage {
  router: SingletonRouter;
  productsById: Map<string, { id: string; name: string; price: number }>;
  data: {
    key: string;
  };
}

const CartButtonContainer = CartConnect(props => {
  console.log("props---", props);
  const handleAddCart = () => {
    props.addToCart({
      sessionId: "123456",
      productId: props.id,
      quantity: 1
    });
  };
  console.log(props.cart.filter(item => item.productId === props.id));
  if (props.cart.filter(item => item.productId === props.id).length === 1) {
    return <div />;
  }

  return <CartButton onClick={handleAddCart}>Add to cart</CartButton>;
});

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
        <CartButtonContainer id={product.id} {...this.props} />
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

      const cartRes = await fetch(`http://localhost:3001/cart`);
      const cartData = await cartRes.json();

      return {
        data: data[0],
        cartData,
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
    props.getCartItems(props.cartData);
  }

  public render() {
    return <IndexContainer {...this.props} />;
  }
}

export default ProductProvider(CartProvider(withRouter(Product)));
