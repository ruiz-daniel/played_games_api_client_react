import React, { useState, useRef, useEffect } from "react";
import { useNavigation } from "../../hooks/useNavigation";
import { useUser } from "../../hooks/useUser";

import { Sidebar, SidebarContent, SidebarHeader, SidebarLink } from "./SideBar";

import { Drawer, DrawerContent } from "@/components/ui/drawer";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import * as routes from "../../routes";

import UserCard from "../utils/cards/UserCard";
import TopBarNavElement from "../utils/TopBarNavElement";
import HamburgerMenu from "../icons/HamburgerMenu";

const TopBar = () => {
  const navigator = useNavigation();
  const [sideMenu, toggleSideMenu] = useState(false);

  const { user, logout, getUserData } = useUser();

  useEffect(() => {
    getUserData();
  }, []);

  // var isMobile = navigator.userAgent.toLowerCase().match(/mobile/i)

  const goToDashboard = () => {
    user?._id && navigator.goToDashboard();
  };
  const handleLoginOrOut = () => {
    user?._id ? logout() : navigator.goToLogin();
  };

  const userMenuItems = [
    {
      label: user?.display_name ?? "Guest",
      command: goToDashboard,
    },
    {
      label: user?._id ? "Logout" : "Login",
      command: handleLoginOrOut,
    },
  ];

  return (
    <div className="sticky top-0 z-1 bg-white px-1 py-3 flex items-center w-full shadow">
      {user?._id && (
        <div className="flex gap-8 items-center flex-1">
          <div
            className="p-2 pb-4 cursor-pointer"
            onClick={() => toggleSideMenu(true)}
          >
            <HamburgerMenu />
          </div>
          <div className="flex gap-8 items-center">
            <TopBarNavElement
              navigationLink={routes.playedgames}
              text="Games"
            />
            <TopBarNavElement
              navigationLink={routes.uploadgame}
              text="Upload"
            />
            <TopBarNavElement navigationLink={routes.stats} text="Stats" />
            <TopBarNavElement
              navigationLink={routes.singleLists}
              text="Lists"
            />
          </div>
        </div>
      )}
      {!user?._id && (
        <div className="flex gap-3 flex-1 items-center">
          <div
            className="p-3 cursor-pointer"
            onClick={() => toggleSideMenu(true)}
          >
            <HamburgerMenu width={32} height={32} />
          </div>
          <h1 className="font-serif font-bold text-4xl text-amber-700">
            VG Shelf
          </h1>
        </div>
      )}
      <div className="mr-3">
        {!sideMenu && (
          <DropdownMenu>
            <DropdownMenuTrigger
              nativeButton={false}
              render={
                user?._id ? (
                  <img
                    width={60}
                    height={60}
                    className="rounded-full cursor-pointer"
                    src={user?.profile_picture}
                  />
                ) : (
                  <div className="bg-gray-200 w-12 h-12  p-3 rounded-full cursor-pointer">
                    <i className="pi pi-user" />
                  </div>
                )
              }
            />
            <DropdownMenuContent className="w-40" align="start">
              <DropdownMenuGroup>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuItem>
                  Profile
                  <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  Settings
                  <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
              <DropdownMenuSeparator />
              <DropdownMenuGroup>
                <DropdownMenuItem onClick={logout}>
                  Log out
                  <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>
      <Drawer
        open={sideMenu}
        showSwipeHandle={true}
        swipeDirection={"left"}
        onOpenChange={toggleSideMenu}
      >
        <DrawerContent>
          <Sidebar className={""}>
            <SidebarHeader className={"flex flex-column gap-3"}>
              <section>
                <UserCard user={user} className={"h-20 py-2"} />
              </section>
            </SidebarHeader>
            {user?._id && (
              <SidebarContent className="menu-section">
                <SidebarLink
                  linkTo={routes.playedgames}
                  onClick={() => toggleSideMenu(false)}
                >
                  <i className="pi pi-database"></i> Played Games
                </SidebarLink>
                <SidebarLink
                  linkTo={routes.uploadgame}
                  onClick={() => toggleSideMenu(false)}
                >
                  <i className="pi pi-upload"></i> Upload Games
                </SidebarLink>
                <SidebarLink
                  linkTo={routes.stats}
                  onClick={() => toggleSideMenu(false)}
                >
                  <i className="pi pi-chart-bar"></i> Stats
                </SidebarLink>
                <SidebarLink
                  linkTo={routes.singleLists}
                  onClick={() => toggleSideMenu(false)}
                >
                  <i className="pi pi-chart-list"></i> Lists
                </SidebarLink>
              </SidebarContent>
            )}
          </Sidebar>
        </DrawerContent>
      </Drawer>
    </div>
  );
};

export default TopBar;
