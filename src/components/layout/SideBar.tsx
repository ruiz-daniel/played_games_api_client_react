import React from "react";
import classNames from "classnames";
import { Link, useLocation } from "react-router-dom";

type SidebarProps = {
  children: React.ReactNode;
  className?: string;
};

export const Sidebar = ({ children, className }: SidebarProps) => {
  return (
    <div className={classNames("flex flex-col gap-3 px-3", className)}>
      {children}
    </div>
  );
};

export const SidebarHeader = ({ children, className }: SidebarProps) => {
  return (
    <section id="sidebar-header" className={className}>
      {children}
    </section>
  );
};

export const SidebarContent = ({ children, className }: SidebarProps) => {
  return (
    <section id="sidebar-content" className={className}>
      {children}
    </section>
  );
};

type SidebarItemProps = SidebarProps & {
  onClick?: () => void;
};

export const SidebarItem = ({
  children,
  onClick,
  className,
}: SidebarItemProps) => {
  return (
    <div className={className} onClick={onClick}>
      {children}
    </div>
  );
};

type SidebarLinkProps = SidebarProps & {
  onClick?: () => void;
  linkTo: string;
};

export const SidebarLink = ({
  children,
  onClick,
  linkTo,
  className,
}: SidebarLinkProps) => {
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
