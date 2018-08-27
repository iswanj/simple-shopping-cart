import React from "react";

export const ContextConnect = (Component, Context) => {
  class ConnectedComponent extends React.Component<any> {
    public render() {
      return (
        <Context.Consumer>
          {state => {
            console.log("state--", state);
            return <Component {...this.props} {...state} />;
          }}
        </Context.Consumer>
      );
    }
  }

  return ConnectedComponent;
};
