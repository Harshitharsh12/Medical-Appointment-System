import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import { Col, Form, Input, Row, TimePicker } from "antd";
import axios from "axios";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import moment from "moment";

const DoctorProfile = () => {
  const user = useSelector((state) => state?.users?.user);
  const [data, setData] = useState(null);

  const getDoctorData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/admin/getDoctor",
        { userId: user._id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        setData(res?.data?.data);
      } else {
        toast.error(res?.data?.message);
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    getDoctorData();
    // eslint-disable-next-line
  }, []);
  const handleUpdate = async (values) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/updateDoctor",
        {
          ...values,
          _id: data._id,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <Layout>
      <h1 className="text-center"> Doctor Profile:</h1>
      {data && (
        <Form layout="vertical" onFinish={handleUpdate}>
          <h4>Personal Details:</h4>

          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="First Name"
                initialValue={data.firstName}
                name="firstName"
                required
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Last Name"
                initialValue={data.lastName}
                name="lastName"
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Last Name:" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Phone Number"
                name="phone"
                initialValue={data.phone}
                required
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Your Mobile Number:" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Email"
                name="email"
                initialValue={data.email}
                required
                rules={[{ required: true }]}
              >
                <Input type="email" placeholder="Your Email:" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Website"
                initialValue={data.website}
                name="website"
              >
                <Input type="text" placeholder="Your Website Name:" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Address"
                name="address"
                initialValue={data.address}
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Address Name:" />
              </Form.Item>
            </Col>
          </Row>
          <h4>Professional Details:</h4>
          <Row gutter={20}>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Specialization"
                name="specialization"
                initialValue={data.specialization}
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Specialization:" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Experience"
                name="experience"
                initialValue={data.experience}
                required
                rules={[{ required: true }]}
              >
                <Input type="text" placeholder="Your Experience:" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="FeesPerConsultation"
                name="feesPerConsultation"
                initialValue={data.feesPerConsultation}
                required
                rules={[{ required: true }]}
              >
                <Input type="number" placeholder="Your Consultation Fees:" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <Form.Item
                label="Timings"
                name="timings"
                required
                rules={[{ required: true }]}
                initialValue={[
                  moment(data.timings[0]),
                  moment(data.timings[1]),
                ]}
              >
                <TimePicker.RangePicker format="HH:mm" />
              </Form.Item>
            </Col>
            <Col xs={24} md={24} lg={8}>
              <button className="btn btn-primary form-btn" type="submit">
                Update
              </button>
            </Col>
          </Row>
        </Form>
      )}
    </Layout>
  );
};

export default DoctorProfile;
