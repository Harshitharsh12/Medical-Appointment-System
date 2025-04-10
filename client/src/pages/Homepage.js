import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Layout from "../components/Layout";
import { useDispatch } from "react-redux";
import { setUser } from "../features/userSlice";
import DoctorCard from "./Doctor/DoctorCard";
import { Row } from "antd";
const Homepage = () => {
  const [doctors, setDoctors] = useState([]);
  const dispatch = useDispatch();
  const getAllDoctorsData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getDoctors",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        setDoctors(res?.data?.data);
      } else {
        console.log(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getUserData",
        {},
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res.data.success) {
        dispatch(setUser(res?.data?.data));
      }
    } catch (error) {
      toast.error(error);
      console.log(error);
    }
  };
  useEffect(() => {
    getUserData();
    getAllDoctorsData();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="text-center pt-4">Our Doctors List</h1>
      <Row>
        {doctors && doctors.map((d) => <DoctorCard doctor={d} key={d._id} />)}
      </Row>
    </Layout>
  );
};

export default Homepage;
