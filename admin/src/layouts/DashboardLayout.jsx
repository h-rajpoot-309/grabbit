import { Outlet } from "react-router";
// import Navbar from "../components/Navbar";
// import Sidebar from "../components/Sidebar";

function DashboardLayout() {
  return (
    <div>
      <h1>SideBar</h1>
      <h1>NavBar</h1>
      <Outlet />
    </div>

    // <div className="drawer lg:drawer-open">
    //   <input
    //     id="my-drawer"
    //     type="checkbox"
    //     className="drawer-toggle"
    //     defaultChecked
    //   />

    //   <div className="drawer-content">
    //     <Navbar />

    //     <main className="p-6">
    //       <Outlet />
    //     </main>
    //   </div>

    //   <Sidebar />
    // </div>
  );
}

export default DashboardLayout;
