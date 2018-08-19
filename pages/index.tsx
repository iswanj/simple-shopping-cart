import React from "react";
import Link from "next/link";

import fetch from "isomorphic-unfetch";

import Header from "../components/layout/Header";
import { parseDataList } from "../util/core";
import {
  Wrapper,
  CartLink,
  TopBar,
  List,
  ListItem,
  Price,
  Name
} from "./styles";

import {
  ProductProvider,
  ProductConnect
} from "../controller/ProductController";

interface IIndexProps {
  products: [{}];
  data: [{}];
  getProducts(Array): void;
}

class Container extends React.Component<any> {
  public render() {
    const { productsById, productKeys } = this.props;
    const productList = parseDataList(productsById, productKeys);
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
        <List>{productList.map(this.renderItems)}</List>
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

const IndexContainer = ProductConnect(Container);
class Index extends React.Component<IIndexProps> {
  public static defaultProps = {
    products: []
  };

  public static async getInitialProps(): Promise<any> {
    try {
      const res = await fetch("http://localhost:3001/products");
      const data = await res.json();
      return {
        data
      };
    } catch (error) {
      console.log(error);
      return {
        error
      };
    }
  }

  constructor(props: IIndexProps) {
    super(props);
    props.getProducts(props.data);
  }

  public render() {
    return <IndexContainer />;
  }
}

// export default ProductProvider(Index);
export default ProductProvider(Index);

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
