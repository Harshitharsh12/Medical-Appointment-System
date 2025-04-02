import React from "react";
import "../styles/RegisterStyles.css";
import { Form, Input } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
const Register = () => {
  const navigate = useNavigate();
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/register", values);
      if (res?.data?.success) {
        toast.success(res.data.message);
        navigate("/login");
      } else {
        console.log(res.data.message);
        toast.error(res.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong!!");
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
          <h1 className="text-center">Register Form:</h1>
          <Form.Item label="Name" name="name">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>
          <Form.Item label="Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <Link to="/login" className="ms-2 mb-2  ">
            Already User Login Here
          </Link>
          <button className="btn btn-primary" type="submit">
            Register
          </button>
        </Form>
      </div>
    </>
  );
};

export default Register;
