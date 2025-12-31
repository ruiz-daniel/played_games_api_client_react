import React, { useEffect } from "react";
import { useUser } from "../../hooks/useUser";
import LoginForm from "../utils/forms/LoginForm";
import { UserCredentials } from "../../models/types";
import { NewUser } from "../../models/User";
import { useNavigation } from "../../hooks/useNavigation";

const Home = () => {
  const {login, signup} = useUser()
  const navigator = useNavigation()
  // useEffect(() => {
  //   var sections = document.querySelectorAll("section");
  //   var options = {
  //     rootMargin: "0px",
  //     threshold: 0.25,
  //   };
  //   var callback = (entries) => {
  //     entries.forEach((entry) => {
  //       var target = entry.target;
  //       if (entry.intersectionRatio >= 0.25) {
  //         target.classList.add("is-inview");
  //       } else {
  //         target.classList.remove("is-inview");
  //       }
  //     });
  //   };
  //   var observer = new IntersectionObserver(callback, options);
  //   sections.forEach((section, index) => {
  //     observer.observe(section);
  //   });
  // }, []);

  const handleLogin = (data: UserCredentials) => {
    login(data, (response) => {
      if (response) {
        navigator.goToDashboard()
      }
    })
  }

  const handleSignUp = (data: NewUser) => {
    signup(data, (response) => {
      if (response) {
        navigator.goToDashboard()
      }
    })
  }

  return (
    <div className="flex flex-col gap-12 w-full h-full items-center justify-center home-container">
      <h1 className="font-serif font-bold text-7xl">VG Shelf</h1>
      <LoginForm onSubmit={handleLogin} onSignUp={handleLogin} />
    </div>
  );
};

export default Home;
