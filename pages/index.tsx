import React from "react";
import Link from "next/link";

import Header from "../components/layout/Header";
import {
  Wrapper,
  CartLink,
  TopBar,
  List,
  ListItem,
  Price,
  Name
} from "./styles";

import { getProducts } from "../api/product";

interface IIndexProps {
  products: [{}];
}
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
    );
  }

  private renderItems(item: {
    id: string;
    key: string;
    name: string;
    price: number;
  }) {
    return (
      <Link
        key={item.id}
        as={`/p/${item.key}`}
        href={`/product?key=${item.key}`}
      >
        <ListItem>
          <Name>{item.name}</Name>
          <Price>$ {item.price}</Price>
        </ListItem>
      </Link>
    );
  }
}

// <Link as={`/p/${item.key}`} href={`/product?key=${item.key}`}>
//  <LinkButton>{item.name}</LinkButton>
// </Link>

// Index.getInitialProps = async () => {
//   // const res = await fetch("https://api.tvmaze.com/search/shows?q=batman");
//   // const data = await res.json();
//   // console.log(`Show data fetched. Count: ${data.length}`);
//   // return {
//   //   shows: data
//   // };
// };
