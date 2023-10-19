"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logoutbutton from "./Logoutbutton";
const Navbar = ({ user }) => {
  console.log(user.session.user);
  const [active, setactive] = useState("dashboard");
  return (
    <header className="mx-auto w-full py-4 px-5 border-b">
      <nav className="flex items-center gap-2 relative text-white justify-between">
        <div className="flex items-center justify-center gap-4">
          <h1 className="border-b">TO-DO</h1>
          <Link
            className="navlink"
            onClick={() => setactive("dashboard")}
            href={"/"}
          >
            <span className={active === "dashboard" ? "active" : ""}>
              Dashboard
            </span>
          </Link>
          <Link
            className="navlink"
            onClick={() => setactive("todos")}
            href={"/todos"}
          >
            <span className={active === "todos" ? "active" : ""}>Todos</span>
          </Link>
        </div>
        {user ? (
          <div className="flex items-center gap-1">
            {/* <span>Hii,{user.session.user.email.split("@")[0]}</span>{" "} */}
            <span>Hii,{user.session.user.user_metadata.name}</span>
            <span>{user.session.user.user_metadata.lastname}</span>
            <Logoutbutton />
          </div> 
        ) : (
          <>
            {" "}
            <div className="flex items-center gap-4">
              <Link
                className="navlink"
                onClick={() => setactive("login")}
                href={"/login"}
              >
                <span className={active === "login" ? "active" : ""}>
                  Login
                </span>
              </Link>
              <Link
                className="navlink"
                onClick={() => setactive("register")}
                href={"/register"}
              >
                <span className={active === "register" ? "active" : ""}>
                  Register
                </span>
              </Link>
            </div>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
