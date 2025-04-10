import React, { useEffect, useState } from "react";
import Layout from "../../components/Layout";
import axios from "axios";
import toast from "react-hot-toast";
const Users = () => {
  const [users, setUsers] = useState([]);
  const getAllUsersData = async () => {
    try {
      const res = await axios.get("/api/v1/admin/getAllUsers", {
        headers: { Authorization: "Bearer " + localStorage.getItem("token") },
      });
      if (res?.data?.success) {
        toast.success(res?.data?.message);
        setUsers(res?.data?.data);
      } else {
        toast.error(res?.data?.message);
      }
    } catch (error) {
      console.log(error);
      toast.error("Error In Getting Users Data!!");
    }
  };
  useEffect(() => {
    getAllUsersData();
  }, []);

  return (
    <Layout>
      <h1 className="text-center my-6">Users Page</h1>
      <div className="table-responsive">
        <table className="table table-striped table-responsive p-5  ms-5">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">IsDoctor</th>
              <th scope="col">IsAdmin</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u._id}>
                <td>{u.name}</td>
                <td>{u.email}</td>
                <td>{u.isDoctor ? "Yes" : "No"}</td>
                <td>{u.isAdmin ? "Yes" : "No"}</td>
                <td>
                  <button className="btn btn-danger ms-0">Block</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Layout>
  );
};
export default Users;
