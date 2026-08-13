import { classNames } from "primereact/utils";
import { Link, useLocation } from "react-router-dom";

export const Sidebar = ({ children, className }) => {
  return (
    <div className={classNames("flex flex-col gap-3 px-3", className)}>
      {children}
    </div>
  );
};

export const SidebarHeader = ({ children, className }) => {
  return (
    <section id="sidebar-header" className={className}>
      {children}
    </section>
  );
};

export const SidebarContent = ({ children, className }) => {
  return (
    <section id="sidebar-content" className={className}>
      {children}
    </section>
  );
};

export const SidebarItem = ({ children, onClick, className }) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

export const SidebarLink = ({ children, onClick, linkTo }) => {
  const location = useLocation();
  return (
    <div className="py-2 px-3 my-2 font-semibold">
      <Link onClick={onClick} to={linkTo}>
        <h3
          className={classNames(
            "py-4 px-3 rounded-2xl",
            location.pathname.includes(linkTo)
              ? "bg-gray-300/50"
              : "hover:bg-gray-300/50",
          )}
        >
          {children}
        </h3>
      </Link>
    </div>
  );
};
