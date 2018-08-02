const express = require("express"); // tslint:disable-line
import * as next from "next";

const port = parseInt(process.env.PORT, 10) || 3000;
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

app
  .prepare()
  .then(() => {
    const server = express();

    server.get("/cart", (req, res) => {
      return app.render(req, res, "/cart", req.query);
    });

    server.get("/checkout", (req, res) => {
      return app.render(req, res, "/checkout", req.query);
    });

    server.get("/p/:id", (req, res) => {
      const actualPage = "/product";
      const queryParams = { id: req.params.id };
      app.render(req, res, actualPage, queryParams);
    });

    server.get("*", (req, res) => {
      return handle(req, res);
    });

    server.listen(port, err => {
      if (err) {
        throw err;
      }
      console.log(`> Ready on http://localhost:${port}`);
    });
  })
  .catch(error => {
    console.log("error:- ", error);
  });
