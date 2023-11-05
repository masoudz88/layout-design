import React from "react";

const CustomizedButton = ({ onClick, styles, text }) => {
  return <button onClick={onClick} style={styles}>{text}</button>;
};

export default CustomizedButton;
