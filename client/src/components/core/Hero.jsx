import React from "react";
import PropTypes from "prop-types";

const Hero = ({ title, subtitle, size = "normal", color = "light" }) => {
  return (
      <div>
        <section className={`hero is-${color} is-${size} mt-4`}>
          <div className="hero-body">
            <p className="title">
              {title}
            </p>
            <p className="subtitle">
              {subtitle}
            </p>
          </div>
        </section>
      </div>
  );
};

Hero.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  size: PropTypes.oneOf(["normal", "medium", "large"]),
  color: PropTypes.oneOfType([
    PropTypes.oneOf([
      "primary",
      "link",
      "info",
      "success",
      "warning",
      "danger",
      "dark",
      "text",
    ]),
    PropTypes.string,
  ]),
};

export default Hero;
