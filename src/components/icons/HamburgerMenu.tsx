import React from "react";

const HamburgerMenu = ({
  width = 64,
  height = 64,
}: {
  width?: number;
  height?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      xmlnsXlink="http://www.w3.org/1999/xlink"
      aria-hidden="true"
      role="img"
      width={width}
      height={height}
      viewBox="0 0 16 16"
      style={{
        color: "rgb(74, 85, 101)",
        opacity: 1,
        transform: "rotate(0deg)",
      }}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M0 3.75A.75.75 0 0 1 .75 3h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 3.75M0 8a.75.75 0 0 1 .75-.75h14.5a.75.75 0 0 1 0 1.5H.75A.75.75 0 0 1 0 8m.75 3.5a.75.75 0 0 0 0 1.5h14.5a.75.75 0 0 0 0-1.5z"
        clipRule="evenodd"
      ></path>
    </svg>
  );
};

export default HamburgerMenu;
