import React from "react";

const DetailItem = ({ label, value, width = "w-35", align = "text-left" }) => {
  return (
    <label className={`flex font-bold ml-5 text-sm text-cyan-200 ${align}`}>
      {label}:
      <div className={`${width} mb-5 ml-2 border-gray-300`}>{value}</div>
    </label>
  );
};

export default DetailItem;
