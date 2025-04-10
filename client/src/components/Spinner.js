// import React from "react";

// Bootstrap Spiner:
// const Spinner = () => {
//   return (
//     <div className="d-flex justify-content-center spinner">
//       <div className="spinner-border text-primary" role="status">
//         <span className="visually-hidden">Loading...</span>
//       </div>
//     </div>
//   );
// };

// export default Spinner;

// React-Spinnner:
import { FadeLoader } from "react-spinners";

function Spinner() {
  return (
    <div style={{ textAlign: "center", marginLeft: 800 }}>
      <FadeLoader
        loading={true}
        color={"#3f1bf5"}
        width={5}
        height={15}
        cssOverride={{ marginTop: 50 }}
      />
    </div>
  );
}

export default Spinner;
