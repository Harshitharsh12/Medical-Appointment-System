import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Form, Input } from "antd";

import { showLoading, hideLoading } from "../features/alertSlice";

import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const Profile = () => {
  const [data, setData] = useState(null);
  const user = useSelector((state) => state.users.user);
  const dispatch = useDispatch();

  const getData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        setData(res?.data?.data);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getData();
    // eslint-disable-next-line
  }, []);

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());
      const res = await axios.post("/api/v1/user/updateProfile", values, {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      dispatch(hideLoading());
      if (res?.data?.success) {
        toast.success(res.data.message);
        getData();
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Something Went Wrong!!");
    }
  };
  return (
    <>
      <div className="form-container">
        {data && (
          <Form
            layout="vertical"
            onFinish={onfinishHandler}
            className=" register-form card p-5 mx-5 py-2 "
            initialValues={data}
          >
            <h1 className="text-center">User Profile:</h1>
            <Form.Item label="Id" name="_id">
              <Input type="text" required disabled />
            </Form.Item>
            <Form.Item label="Name" name="name">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="Email" name="email">
              <Input type="email" required />
            </Form.Item>
            <Form.Item label="Favourite-Game" name="game">
              <Input type="text" required />
            </Form.Item>
            <Form.Item label="IsAdmin" name="isAdmin">
              <Input type="text" disabled />
            </Form.Item>
            <Form.Item label="IsDoctor" name="isDoctor">
              <Input type="text" disabled />
            </Form.Item>
            <div className="d-flex ">
              <button className="btn btn-primary ms-0 " type="submit">
                Update
              </button>
              <Link className="btn btn-success" to={"/"}>
                Home Page
              </Link>
            </div>
          </Form>
        )}
      </div>
    </>
  );
};

export default Profile;
