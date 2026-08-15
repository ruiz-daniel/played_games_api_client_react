import { classNames } from "primereact/utils";
import { CSSProperties } from "react";

type DashboardButtonProps = {
  icon?: string;
  text: string;
  action?: () => void;
  className?: string;
  iconClassName?: string;
  textClassName?: string;
};

const DashboardButton = ({
  icon = "desktop",
  text,
  action,
  className,
  iconClassName,
  textClassName,
}: DashboardButtonProps) => {
  return (
    <div
      className={classNames(
        "flex flex-col items-center justify-center shadow-2xl transition-all duration-200 w-40 h-40 rounded-2xl p-3",
        { "cursor-pointer": action !== undefined },
        className,
      )}
      onClick={action}
    >
      <div>
        <i className={`pi pi-${icon} text-4xl ${iconClassName}`}></i>
      </div>
      <div>
        <h2
          className={classNames(
            "m-1 w-full text-center text-lg font-semibold",
            textClassName,
          )}
        >
          {text}
        </h2>
      </div>
    </div>
  );
};

export default DashboardButton;
