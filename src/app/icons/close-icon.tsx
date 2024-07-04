import React from "react";

function CloseIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="13"
      height="13"
      fill="none"
      viewBox="0 0 13 13"
      {...props}
    >
      <path
        fill="currentColor"
        d="M7.691 6.5l5.062-5.062A.841.841 0 1011.562.247L6.5 5.309 1.438.247a.841.841 0 10-1.19 1.19L5.308 6.5.247 11.562a.841.841 0 101.191 1.191L6.5 7.691l5.062 5.062a.84.84 0 001.19 0 .84.84 0 000-1.19L7.692 6.5z"
      ></path>
    </svg>
  );
}

export default CloseIcon;
