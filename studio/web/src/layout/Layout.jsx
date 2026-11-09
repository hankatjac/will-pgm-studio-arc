import { useEffect, useRef, useState } from "react";
import { Outlet } from "react-router-dom";
import { useMediaQuery } from "usehooks-ts";
import { useClickOutside } from "../hooks/use-click-outside";
import Footer from "../components/Footer";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ScollToTop from "../components/ScollToTop";

const Layout = () => {
  const isDesktopDevice = useMediaQuery("(min-width: 768px)");
  const [collapsed, setCollapsed] = useState(!isDesktopDevice);

  const sidebarRef = useRef(null);

  useEffect(() => {
    setCollapsed(!isDesktopDevice);
  }, [isDesktopDevice]);

  useClickOutside([sidebarRef], () => {
    if (!isDesktopDevice && !collapsed) {
      setCollapsed(true);
    }
  });

  return (
    <div className="min-h-screen flex bg-slate-100 transition-colors dark:bg-slate-950">
      <div
        className={`pointer-events-none fixed inset-0 -z-10 bg-black opacity-0 transition-opacity
                  ${
                    !collapsed
                      ? "max-md:pointer-events-auto max-md:z-50 max-md:opacity-30"
                      : ""
                  }`}
      />
      <Sidebar ref={sidebarRef} collapsed={collapsed} />
      <div
        className={`flex flex-col transition-[margin] duration-300 flex-1 ${
          collapsed ? "ml-[70px]" : "md:ml-[240px]"
        }`}
        style={{ minHeight: "100vh" }}
      >
        {/* Sticky Header */}
        <div className="sticky top-0 z-30">
          <Header collapsed={collapsed} setCollapsed={setCollapsed} />
        </div>
        {/* Scrollable Content */}
        <div className="flex-1 overflow-auto">
          <Outlet />
        </div>
        {/* Sticky Footer */}
        <div className="sticky bottom-0 z-30">
          <Footer />
        </div>
      </div>
      <ScollToTop />
    </div>
  );
};

export default Layout;
