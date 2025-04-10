import "../styles/RegisterStyles.css";
import { Form, Input } from "antd";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { useDispatch } from "react-redux";
import { showLoading, hideLoading } from "../features/alertSlice";
const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onfinishHandler = async (values) => {
    try {
      const res = await axios.post("/api/v1/user/login", values);
      if (!res?.data?.success) {
        console.log(res.data.message);
        toast.error(res.data.message);
      } else {
        dispatch(showLoading());
        setTimeout(() => {
          localStorage.setItem("token", res.data.token);
          dispatch(hideLoading());
          window.location.reload();
          toast.success(res.data.message);
          navigate("/");
        }, 2000);
      }
    } catch (error) {
      dispatch(hideLoading());
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
          <div className="d-flex justify-content-between">
            <Link to="/register" className="ms-2 mb-2  ">
              Not a User Register Here
            </Link>
            <Link to="/forget-password" className="ms-2 mb-2  ">
              Forget Password
            </Link>
          </div>
          <button className="btn btn-primary mt-2" type="submit">
            Login
          </button>
        </Form>
      </div>
    </>
  );
};

export default Login;
