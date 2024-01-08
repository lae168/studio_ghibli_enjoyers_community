// Outlet is to show the root page
import { Outlet } from "react-router-dom";
//components
import NavBar from "./NavBar";

function RootLayoutPage() {
  return (
    <div className="pt-0 mt-[-3%]  mr-[-3%] ">
      <NavBar />

      <Outlet />
    </div>
  );
}

export default RootLayoutPage;
