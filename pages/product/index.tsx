import { withRouter } from "next/router";
import React from "react";

import Header from "../../components/layout/Header";

interface IProductPage {
  router: {
    query: {
      key: string;
    };
  };
}

export default withRouter((props: IProductPage) => {
  return (
    <div>
      <Header />
      <p>Product id = {props.router.query.key}</p>
    </div>
  );
});
