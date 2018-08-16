import { withRouter, SingletonRouter } from "next/router";
import React from "react";
import { getProductById } from "../../api/product";

import Header from "../../components/layout/Header";

export const ProductContext = React.createContext({});

interface IProductPage {
  router: SingletonRouter;
  product: {
    name: string;
    price: number;
  };
}

interface IProductState {
  product: {
    name: string;
    price: number;
  };
}

class Product extends React.Component<IProductPage, IProductState> {
  public static defaultProps = {
    product: {}
  };

  public static async getInitialProps(context): Promise<any> {
    try {
      const data = await getProductById(context.query.key);
      return {
        product: data
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
    const { product } = props;
    this.state = {
      product
    };
  }

  public render() {
    const { product } = this.state;
    return (
      <ProductContext.Provider
        value={{
          state: this.state
        }}
      >
        <div>
          <Header />
          <p>Product name = {product.name}</p>
          <p>Product price = {product.price}</p>
        </div>
      </ProductContext.Provider>
    );
  }
}

export default withRouter(Product);
