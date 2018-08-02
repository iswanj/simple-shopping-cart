import React from "react";
import Link from "next/link";

export default () => (
  <div>
    <ul>
      <li>
        <Link href="/cart" as="/cart">
          <a>cart page</a>
        </Link>
      </li>
      <li>
        <Link href="/checkout" as="/checkout">
          <a>checkout page</a>
        </Link>
      </li>
    </ul>
    <div>
      <ul>
        <li>
          <Link as="/p/product-one" href="/product?id=product-one">
            <a>product one</a>
          </Link>
        </li>
        <li>
          <Link as="/p/product-two" href="/product?id=product-two">
            <a>product two</a>
          </Link>
        </li>
        <li>
          <Link as="/p/product-tree" href="/product?id=product-tree">
            <a>product tree</a>
          </Link>
        </li>
      </ul>
    </div>
  </div>
);
