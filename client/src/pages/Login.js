import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
const Login = () => {
  const navigate = useNavigate();
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/login", values);
      if (res?.data?.success) {
        localStorage.setItem("token", res.data.token);
        toast.success(res.data.message);
        navigate("/");
      } else {
        console.log(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log("error");
      toast.error("Error In Login!!");
    }
  };
  return (
    <>
      <div className="form-container">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className=" register-form card p-4"
        >
          <h1 className="text-center">Login Form:</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/register" className="ms-2 mb-2  ">
            Not a User Register Here
          </Link>
          <button className="btn btn-primary" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
