import React from "react";
import NavbarComponent from "../Navbar/NavbarComponent";

const GeneralLayout = ({ children }) => {
  return (
      <React.Fragment>
        <NavbarComponent/>
        {children}
      </React.Fragment>
  );
};

export default GeneralLayout;
