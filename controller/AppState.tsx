import React, { Component, ReactElement } from "react";

interface IAppProps {
  debug: boolean;
}

export default class AppState extends Component<IAppProps> {
  constructor(props) {
    super(props);
    this.state = {
      async: {}
    };
    this.setAppState = this.setAppState.bind(this);
  }

  public render() {
    return (
      <div className="AppState">
        {React.Children.map(this.props.children, (child: ReactElement<any>) => {
          return React.cloneElement(child, {
            appState: this.state,
            setAppState: this.setAppState
          });
        })}
      </div>
    );
  }

  private setAppState(updater: object, callback: () => void) {
    // newState can be object or function!
    this.setState(updater, () => {
      if (this.props.debug) {
        console.log("setAppState", JSON.stringify(this.state));
      }
      if (callback) {
        callback();
      }
    });
  }
}
