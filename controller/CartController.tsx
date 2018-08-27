import React, { Component } from "react";
import hoistNonReactStatic from "hoist-non-react-statics";
import { ContextConnect } from "./ContextConnect";
import fetch from "isomorphic-unfetch";

const CartContext = React.createContext({});

interface ICartData {
  sessionId: string;
  productId: string;
  quantity: number;
}

interface IState {
  cart: ICartData[];
  addToCart?: (ICartData) => void;
}

export const CartProvider = Page => {
  class Provider extends Component<{}, IState> {
    public state = {
      cart: []
    };

    public render() {
      return (
        <CartContext.Provider
          value={{ ...this.state, addToCart: this.addToCart }}
        >
          <Page {...this.props} getCartItems={this.getCartItems} />
        </CartContext.Provider>
      );
    }

    private getCartItems = (cart: ICartData[]) => {
      this.setState({
        cart
      });
    };

    private addToCart = async (item: ICartData) => {
      const { cart } = this.state;
      try {
        const res = await fetch("http://localhost:3001/cart", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(item)
        });
        console.log("res---", res);
        await this.setState({
          cart: [...cart, item]
        });
      } catch (error) {
        console.log(error);
      }
    };
  }

  hoistNonReactStatic(Provider, Page);

  return Provider;
};

export const CartConnect = Page => {
  return ContextConnect(Page, CartContext);
};
