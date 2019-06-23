import React, { Children, Component } from "react";
import PropTypes from "prop-types";

class TitleWrapper extends Component {
  render() {
    return(
      <div className="title-wrapper">
        <div className="container">
          <h1>{this.props.children}</h1>
        </div>
      </div>
    );
  }
}

TitleWrapper.propTypes = {
  children: PropTypes.string,
};

export default TitleWrapper;
