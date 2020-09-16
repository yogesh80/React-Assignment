import React from "react";
import loaderSpinner from "../../assets/img/loder2.gif";

class Loader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <>
        {this.props.loading && (
          <div className="loaderSpinner">
            <img src={loaderSpinner} alt="" />
          </div>
        )}
      </>
    );
  }
}

export default Loader;
