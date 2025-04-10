import { Table } from "antd";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Layout from "../../components/Layout";

const DoctorAppointments = () => {
  const user = useSelector((state) => state.users.user);
  const [appointments, setAppointments] = useState();
  const navigate = useNavigate();
  const getAppointments = async () => {
    try {
      const res = await axios.post(
        "/api/v1/user/getDoctorAppointments",
        {
          doctorId: user._id,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        setAppointments(res?.data?.appointments);
        toast.success(res?.data?.message);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    getAppointments();
    // eslint-disable-next-line
  }, []);
  const action = async (status, id) => {
    try {
      const res = await axios.post(
        "/api/v1/user/updateStatus",
        {
          status,
          id,
        },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        getAppointments();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
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
    {
      title: "Actions",
      dataIndex: "status",
      render: (text, record) => (
        <div>
          {record.status === "pending" ? (
            <div>
              <button
                className="btn  btn-success mx-0"
                onClick={() => {
                  action("approved", record._id);
                }}
              >
                Approve
              </button>
              <button
                className="btn btn-danger mx-1"
                onClick={() => {
                  action("rejected", record._id);
                }}
              >
                Reject
              </button>
            </div>
          ) : (
            record.status
          )}
        </div>
      ),
      key: "status",
    },
  ];
  return (
    <Layout>
      <h1 className="text-center my-5">Appointments List:</h1>
      <Table
        className="my-5 mx-5 p-5"
        dataSource={appointments}
        columns={columns}
        initial
      />
    </Layout>
  );
};

export default DoctorAppointments;
