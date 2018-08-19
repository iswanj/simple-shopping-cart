import React, { Component } from "react";
import { Map } from "immutable";
import hoistNonReactStatic from "hoist-non-react-statics";

import { normalizeByKey, getVisibleKeys } from "../util/core";

interface IState {
  productsById: Map<{}, {}>;
  productKeys: string[];
}

const ProductContext = React.createContext({});

export const ProductProvider = Page => {
  class ProductController extends Component<{}, IState> {
    public state = { productsById: Map({}), productKeys: [] };
    public render() {
      return (
        <ProductContext.Provider value={{ ...this.state }}>
          <Page
            {...this.props}
            getProducts={this.getProducts}
            getProductById={this.getProductById}
          />
        </ProductContext.Provider>
      );
    }

    private getProducts = async (data: [{}]) => {
      this.setState({
        productsById: Map(normalizeByKey(data, "key")),
        productKeys: getVisibleKeys(data, "key")
      });
    };

    private getProductById = async (data: { key: string }) => {
      const { productsById } = this.state;
      this.setState({
        productsById: productsById.merge(
          productsById,
          Map({
            [data.key]: { ...data }
          })
        ),
        productKeys: [data.key]
      });
    };
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
