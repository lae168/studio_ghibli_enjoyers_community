import React, { useState } from "react";


const Sidebar = () => {
  const [sidebarVisible, setSidebarVisible] = useState(false);

  const toggleSidebar = () => {
    setSidebarVisible(!sidebarVisible);
  };

  return (
    <div className={`sidebar ${sidebarVisible ? "visible" : ""}`}>
      <span role="img" aria-label="Sidebar Icon" onClick={toggleSidebar}>
        📚
      </span>
    </div>
  );
};

export default Sidebar;
