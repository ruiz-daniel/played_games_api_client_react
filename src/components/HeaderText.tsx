import React from "react";

interface HeaderTextProps {
  text: string;
}

const HeaderText: React.FC<HeaderTextProps> = ({ text }) => {
  return <div className="flex-1 text-2xl font-bold">{text}</div>;
};

export default HeaderText;
