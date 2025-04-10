import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import toast from "react-hot-toast";
import axios from "axios";

const Doctors = () => {
  const [doctors, setDoctors] = useState([]);
  const getAllDoctorsData = async () => {
    try {
      const res = await axios.get(
        "/api/v1/admin/getAllDoctors",

        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setDoctors(res?.data?.data);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error In Getting Doctors Data!!");
    }
  };

  const handleAcceptance = async (status, _id) => {
    try {
      const res = await axios.post(
        "/api/v1/admin/changeStatus",
        { status: status, _id: _id },
        {
          headers: { Authorization: "Bearer " + localStorage.getItem("token") },
        }
      );
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        getAllDoctorsData();
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error);
    }
  };
  useEffect(() => {
    getAllDoctorsData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center py-4">Doctors List:</h1>
      <div className="table-responsive">
        <table className="table table-striped p-5  ms-5">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Status</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((d) => (
              <tr key={d._id}>
                <td>{`${d.firstName} ${d.lastName}`}</td>
                <td>{d.status}</td>
                <td>{d.phone}</td>
                <td>
                  {d.status === "pending" ? (
                    <div className="d-flex">
                      <button
                        className="btn btn-success ms-0"
                        onClick={() => {
                          handleAcceptance("approved", d._id);
                        }}
                      >
                        Approve
                      </button>
                      <button
                        className="btn btn-danger ms-1"
                        onClick={() => {
                          handleAcceptance("rejected", d._id);
                        }}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <div className="ms-0">{d.status}</div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};

export default Doctors;
