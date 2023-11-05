import React from "react";

const Section = ({ onClick, styles, children }) => {
  return <div onClick={onClick} style={styles}>{children}</div>;
};

export default Section;
