import { withRouter, SingletonRouter } from "next/router";
import React from "react";

import Header from "../../components/layout/Header";

export const ProductContext = React.createContext({});

interface IProductPage {
  router: SingletonRouter;
}

class Product extends React.Component<IProductPage> {
  public static async getInitialProps(context): Promise<any> {
    console.log("context---", context);
    return {};
    // ...
  }

  public render() {
    return (
      <ProductContext.Provider
        value={{
          ...this.state
        }}
      >
        <div>
          <Header />
          <p>Product id = {this.props.router.query.key}</p>
        </div>
      </ProductContext.Provider>
    );
  }
}

export default withRouter(Product);
