import React, { Component } from "react";
import { Map } from "immutable";
import hoistNonReactStatic from "hoist-non-react-statics";
import { ContextConnect } from "./ContextConnect";

import { normalizeByKey, getVisibleKeys } from "../util/core";

interface IState {
  productsById: Map<{}, {}>;
  productKeys: string[];
}

const ProductContext = React.createContext({});

export const ProductProvider = Page => {
  class Provider extends Component<{}, IState> {
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

    private getProducts = (data: [{}]) => {
      this.setState({
        productsById: Map(normalizeByKey(data, "key")),
        productKeys: getVisibleKeys(data, "key")
      });
    };

    private getProductById = (data: { key: string }) => {
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

  hoistNonReactStatic(Provider, Page);

  return Provider;
};

export const ProductConnect = Page => ContextConnect(Page, ProductContext);
