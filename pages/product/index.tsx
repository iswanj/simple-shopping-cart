import { withRouter } from "next/router";
import React from "react";

interface IProductPage {
  router: {
    query: {
      id: number;
    };
  };
}

export default withRouter((props: IProductPage) => {
  return <div>Product id = {props.router.query.id}</div>;
});
