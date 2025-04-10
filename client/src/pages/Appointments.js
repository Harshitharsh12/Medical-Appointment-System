import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { Table } from "antd";
import Layout from "../components/Layout";

const Appointments = () => {
  const [appointment, setAppointment] = useState([]);
  const user = useSelector((state) => state?.users?.user);
  const appointments = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getAppointments",
        {
          userId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        setAppointment(res?.data?.appointments);
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      toast.error(error);
    }
  };
  useEffect(() => {
    appointments();
    // eslint-disable-next-line
  }, []);

  const columns = [
    {
      title: "Id",
      dataIndex: "_id",
      key: "userId",
    },
    {
      title: "User Name",
      dataIndex: "userInfo.name",
      render: (text, record) => <span>{record.userInfo.name}</span>,
      key: "userName",
    },
    {
      title: "Doctor Name",
      dataIndex: "doctorInfo",
      render: (text, record) => (
        <span>
          {`${record.doctorInfo.firstName}  ${record.doctorInfo.lastName}`}
        </span>
      ),

      key: "doctorName",
    },
    {
      title: "Date & Time",
      dataIndex: "date time",
      render: (text, record) => (
        <span>
          {record.date + " "}
          {record.time}
        </span>
      ),
      key: "date&time",
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
    },
  ];
  return (
    <Layout>
      <h1 className=" text-center my-5">Appointments List:</h1>

      <Table
        className="my-5 mx-5"
        dataSource={appointment}
        columns={columns}
        initial
      />
    </Layout>
  );
};

export default Appointments;
