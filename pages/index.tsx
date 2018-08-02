import React from "react";
import Link from "next/link";

export default () => (
  <ul>
    <li>
      <Link href="/a" as="/a">
        <a>a page</a>
      </Link>
    </li>
    <li>
      <Link href="/b" as="/b">
        <a>b page</a>
      </Link>
    </li>
  </ul>
);
