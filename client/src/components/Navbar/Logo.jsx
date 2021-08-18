import React from "react";
import logo from "./../../logo.svg";
import { Link } from "react-router-dom";

const Logo = () => {
	return (
			<React.Fragment>
				<Link to="/" className="navbar-item">
					<img src={logo} alt="Logo"/>
				</Link>
			</React.Fragment>
	);
};

export default Logo;
