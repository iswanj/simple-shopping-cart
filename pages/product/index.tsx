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

class Product extends React.Component<IProductPage> {
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

  public render() {
    const { product } = this.props;
    return (
      <ProductContext.Provider
        value={{
          ...this.state
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
