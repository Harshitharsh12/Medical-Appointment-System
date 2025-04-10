import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { showLoading, hideLoading } from "../features/alertSlice";
import { useDispatch } from "react-redux";
import { Form, Input } from "antd";

const ResetPassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onfinishHandler = async (values) => {
    try {
      dispatch(showLoading());

      const res = await axios.post("/api/v1/user/resetPassword", values);
      if (!res?.data?.success) {
        toast.error(res.data.message);
      } else {
        dispatch(hideLoading());
        toast.success(res.data.message);
        navigate("/login");
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error("Error In Login!!");
    }
  };
  return (
    <>
      <div className="form-container p-5">
        <Form
          layout="vertical"
          onFinish={onfinishHandler}
          className=" register-form card "
        >
          <h1 className="text-center py-4 ">Reset Password</h1>

          <Form.Item label="Email" name="email">
            <Input type="email" required />
          </Form.Item>

          <Form.Item label=" Favourite Game" name="game">
            <Input type="text" required />
          </Form.Item>
          <Form.Item label=" New Password" name="password">
            <Input type="password" required />
          </Form.Item>
          <button className="btn btn-primary mt-2" type="submit">
            Reset
          </button>
        </Form>
      </div>
    </>
  );
};

export default ResetPassword;
