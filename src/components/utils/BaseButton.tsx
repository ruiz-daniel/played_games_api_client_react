import React from "react";
import { Button } from "@/components/ui/button";
import classNames from "classnames";

type BaseButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  [key: string]: any;
};

const BaseButton = ({
  label,
  onClick,
  className,
  ...props
}: BaseButtonProps) => {
  return (
    <Button
      className={classNames(
        "bg-cyan-500 hover:bg-cyan-700 cursor-pointer min-w-20 h-10",
        className,
      )}
      onClick={onClick}
      {...props}
    >
      {label}
    </Button>
  );
};

export default BaseButton;
