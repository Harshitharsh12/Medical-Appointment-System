import React from "react";
import moment from "moment";
import { useNavigate } from "react-router-dom";

const DoctorCard = ({ doctor }) => {
  const navigate = useNavigate();
  return (
    <div className="m-5 w-25">
      <div
        className="card mt-3 py-2"
        onClick={() => navigate(`/book-appointments/${doctor._id}`)}
        style={{ cursor: "pointer" }}
      >
        <h3 className="card-header">
          {`Dr. ${doctor.firstName} ${doctor.lastName}`}
        </h3>
        <div className="card-body">
          <p>
            <b>Specialization:</b>
            {` ${doctor.specialization}`}
          </p>
          <p>
            <b>Experience:</b>
            {` ${doctor.experience} Years`}
          </p>
          <p>
            <b>Fees Per Consultation:</b>
            {` ${doctor.feesPerConsultation}$`}
          </p>
          <p>
            <b>Timings:</b>
            {` ${moment(doctor.timings[0]).format("HH:mm")}PM - ${moment(
              doctor.timings[1]
            ).format("HH:mm")}PM`}
          </p>
        </div>
      </div>
    </div>
  );
};

export default DoctorCard;
