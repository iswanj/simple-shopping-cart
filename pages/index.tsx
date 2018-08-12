import React from "react";
import Link from "next/link";

import Header from "../components/layout/Header";
import { Wrapper, CartLink, TopBar, List, ListItem } from "./styles";

import { getProducts } from "../api/product";

interface IIndexProps {
  products: [{}];
}

export const ProductContext = React.createContext({});
export default class Index extends React.Component<IIndexProps> {
  public static async getInitialProps(): Promise<any> {
    const data = await getProducts();

    return {
      products: data
    };
    // ...
  }
  public render() {
    const { products } = this.props;
    return (
      <ProductContext.Provider
        value={{
          ...this.state,
          products
        }}
      >
        <Wrapper>
          <Header />
          <TopBar>
            <CartLink>
              <Link href="/cart" as="/cart">
                <a>cart page</a>
              </Link>
            </CartLink>
          </TopBar>
          <List>
            {products.map(this.renderItems)}
            {/* <ProductContext.Consumer>
              {(data: { products: [{}] }) => {
                console.log("data****", data);
                return data.;
              }}
            </ProductContext.Consumer> */}
          </List>
        </Wrapper>
      </ProductContext.Provider>
    );
  }

  private renderItems(item: { id: string; key: string; name: string }) {
    return (
      <ListItem key={item.id}>
        <Link as={`/p/${item.key}`} href={`/product?key=${item.key}`}>
          <a>{item.name}</a>
        </Link>
      </ListItem>
    );
  }
}

// Index.getInitialProps = async () => {
//   // const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
//   // const data = await res.json();
//   // console.log(`Show data fetched. Count: ${data.length}`);
//   // return {
//   //   shows: data
//   // };
// };
