import { Outlet } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";
import "./layout/Layout.css";

export default function Layout() {
  return (
    <div className="layout">
      <Header />

      {/* Main Content */}
      <main className="main">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}
