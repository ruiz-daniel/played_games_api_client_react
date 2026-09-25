import React from "react";

type ChipProps = {
  text: string;
  onClick?: () => void;
};

const Chip = ({ text, onClick }: ChipProps) => {
  return (
    <div
      className="bg-amber-200! flex items-center justify-center rounded-2xl px-3 py-1 cursor-pointer"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default Chip;
