import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import "../styles/LayoutStyle.css";
import { UserMenu, AdminMenu } from "../Data/Data";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Badge } from "antd";
const Layout = ({ children }) => {
  const user = useSelector((state) => state?.users?.user);

  const DoctorMenu = [
    {
      _id: 0,
      name: "Home",
      path: "/",
      icon: "fa-solid fa-house",
    },
    {
      _id: 1,

      name: "Appointments",
      path: "/doctor-appointments",
      icon: "fa-solid fa-list",
    },

    {
      _id: 3,

      name: "Profile",
      path: `/doctor-profile`,
      icon: "fa-solid fa-user",
    },
  ];

  const location = useLocation();
  const navigate = useNavigate();
  const SidebarMenu = user?.isAdmin
    ? AdminMenu
    : user?.isDoctor
    ? DoctorMenu
    : UserMenu;

  const logout = () => {
    localStorage.clear();
    toast.success("Logout Successfully!!");
    navigate("/login");
  };
  return (
    <>
      <div className="main">
        <div className="layout">
          <div className="sidebar">
            <div className="logo">
              <h2>Medical App</h2>
              <hr />
            </div>
            <div className="menu">
              {SidebarMenu.map((menu) => {
                const isActive = location.pathname === menu.path;
                return (
                  <div
                    key={menu._id}
                    className={`menu-item ${isActive && "active"}`}
                  >
                    <i className={menu.icon}></i>
                    <Link to={`${menu.path}`}>{menu.name}</Link>
                  </div>
                );
              })}
            </div>
            <div className="menu-item" onClick={logout}>
              <i className="fa-solid fa-right-from-bracket"></i>
              <Link>Logout</Link>
            </div>
          </div>
          <div className="content">
            <div className="header">
              <div className="header-content" style={{ cursor: "pointer" }}>
                <Badge
                  count={user?.notification?.length}
                  onClick={() => {
                    navigate("/notification");
                  }}
                  curso
                >
                  <i
                    className="
                fa-solid fa-bell"
                  ></i>
                </Badge>
                <Link to="/profile">{user?.name}</Link>
              </div>
            </div>
            <div className="body">{children}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Layout;
