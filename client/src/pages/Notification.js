import React from "react";
import Layout from "../components/Layout";
import { Tabs } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { hideLoading, showLoading } from "../features/alertSlice";
import axios from "axios";
import toast from "react-hot-toast";

const Notification = () => {
  const dispatch = useDispatch();
  const handleMarkAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/getAllNotification",
        { userId: user._id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      dispatch(hideLoading());
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error("Error In getting Notification!!");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error);
    }
  };
  const handleDeleteAllRead = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/deleteAllNotification",
        { userId: user._id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      dispatch(hideLoading());
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        navigate("/");
      } else {
        toast.error("Error In deleting Notification!!");
      }
    } catch (error) {
      toast.error(error);
    }
  };
  const navigate = useNavigate();
  const user = useSelector((state) => state?.users?.user);
  return (
    <Layout>
      <h4 className="p-3 text-center">Notification Page:</h4>
      <Tabs>
        <Tabs.TabPane tab="unRead" key={0}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleMarkAllRead}
              style={{ cursor: "pointer" }}
            >
              Mark All Read
            </h4>
          </div>
          {user?.notification?.map((nm) => {
            return (
              <div
                className="card"
                key={0}
                onClick={() => {
                  navigate(`/${nm?.data?.onClickPath}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="card-text">{nm.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
        <Tabs.TabPane tab="Read" key={1}>
          <div className="d-flex justify-content-end">
            <h4
              className="p-2"
              onClick={handleDeleteAllRead}
              style={{ cursor: "pointer" }}
            >
              Delete All Read
            </h4>
          </div>
          {user?.seenNotification?.map((nm) => {
            return (
              <div
                className="card"
                key={0}
                onClick={() => {
                  navigate(`/${nm?.data?.onClickPath}`);
                }}
                style={{ cursor: "pointer" }}
              >
                <div className="card-text">{nm.message}</div>
              </div>
            );
          })}
        </Tabs.TabPane>
      </Tabs>
    </Layout>
  );
};

export default Notification;
