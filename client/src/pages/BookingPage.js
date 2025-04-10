import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";
import { useParams } from "react-router-dom";
import { DatePicker, TimePicker } from "antd";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { hideLoading, showLoading } from "../features/alertSlice";

const BookingPage = () => {
  const params = useParams();
  const [doctor, setDoctor] = useState(null);
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const dispatch = useDispatch();
  const user = useSelector((state) => state?.users?.user);
  const bookAppointment = async () => {
    try {
      dispatch(showLoading());
      const res = await axios.post(
        "/api/v1/user/bookAppointment",
        {
          userId: user._id,
          doctorId: doctor.userId,
          userInfo: user,
          doctorInfo: doctor,
          date: date,
          time: time,
          status: "pending",
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      dispatch(hideLoading());
      if (res?.data?.success) {
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      dispatch(hideLoading());
      toast.error(error);
    }
  };
  const getDoctor = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getDoctor",
        {
          _id: params._id,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        setDoctor(res?.data?.data);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    getDoctor();
    // eslint-disable-next-line
  }, []);
  return (
    <Layout>
      <h1 className="text-center">Doctor Booking</h1>
      <div className="container m-5 ">
        {doctor && (
          <div>
            <p>
              <b>Name:</b>
              {` Dr. ${doctor.firstName} ${doctor.lastName}`}
            </p>
            <p>
              <b>FeesPerConsultation:</b>
              {` ${doctor.feesPerConsultation}`}
            </p>
            <p>
              <b>Timings:</b>
              {` ${moment(doctor.timings[0]).format("HH:mm")} -  ${moment(
                doctor.timings[1]
              ).format("HH:mm")}`}
            </p>
            <div className="d-flex flex-column w-50">
              <DatePicker
                className="mt-3"
                format="DD-MM-YYYY"
                onChange={(value) => {
                  setDate(moment(value).format("DD-MM-YYYY"));
                }}
              />
              <TimePicker
                className="mt-4"
                format="HH:mm"
                onChange={(value) => {
                  setTime(moment(value[0]).format("HH:mm"));
                }}
              />

              <button
                className="btn btn-dark mt-4 w-50"
                onClick={bookAppointment}
              >
                Book Now
              </button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default BookingPage;
