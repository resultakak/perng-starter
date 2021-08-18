import React from "react";
import PropTypes from "prop-types";

const Container = ({ children, fluid, breakpoint }) => {
  return (
      <div className={`container ${fluid ? 'is-fluid' : ''} ${breakpoint ? `is-${breakpoint}` : ''}`}>
        {children}
      </div>
  );
};

Container.propTypes = {
  children: PropTypes.node.isRequired,
  fluid: PropTypes.bool,
  breakpoint: PropTypes.oneOf([
    "mobile",
    "tablet",
    "desktop",
    "widescreen",
    "fullhd",
    "fluid",
  ]),
};

Container.defaultProps = {
  fluid: false,
};

export default Container;
