import { classNames } from "primereact/utils";
import { Link, useNavigation } from "react-router-dom";

type TopBarNavElementProps = {
  navigationLink: string;
  text: string;
  iconClassName?: string;
};

const TopBarNavElement = ({
  navigationLink,
  text,
  iconClassName,
}: TopBarNavElementProps) => {
  const isCurrentUrl = window.location?.pathname.includes(navigationLink);
  return (
    <Link
      to={navigationLink}
      className={classNames(
        "px-4 py-2 w-20.5 flex justify-center items-center gap-3 ease-in-out",
        "border-b-5 border-transparent",
        isCurrentUrl
          ? "border-b-5 border-b-cyan-300!"
          : "hover:border-b-cyan-100",
      )}
    >
      {iconClassName && <i className={`pi pi-${iconClassName}`} />}
      <span>{text}</span>
    </Link>
  );
};

export default TopBarNavElement;
