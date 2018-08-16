import React, { Component } from "react";
import { List } from "immutable";
import hoistNonReactStatic from "hoist-non-react-statics";

interface IState {
  products: List<{
    id: string;
  }>;
}

interface IProps {
  getInitialProps(): void;
}

const ProductContext = React.createContext({});

export const ProductProvider = Page => {
  class ProductController extends Component<IProps, IState> {
    public state = { products: List() };
    public render() {
      return (
        <ProductContext.Provider value={{ state: this.state }}>
          <Page {...this.props} getProducts={this.getProducts} />
        </ProductContext.Provider>
      );
    }

    private getProducts = async (data: [{}]) => {
      const { products } = this.state;
      this.setState({
        products: products.push(data)
      });
    };

    // private getProductById = async (key: string) => {
    //   const res = await fetch(`http://localhost:3001/products/${key}`);
    //   const data = await res.json();

    //   this.setState({
    //     currentProduct: data[0]
    //   });
    // };
  }

  hoistNonReactStatic(ProductController, Page);

  return ProductController;
};

export const ProductConnect = Page => {
  class ConnectedComponent extends Component {
    public render() {
      return (
        <ProductContext.Consumer>
          {state => {
            return <Page {...this.props} {...state} />;
          }}
        </ProductContext.Consumer>
      );
    }
  }

  return ConnectedComponent;
};
