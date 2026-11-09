import { forwardRef, useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import logoLight from "../assets/img/logo.jpg";
import blog from "../assets/img/svg/blog-svgrepo-com.svg";
import hour from "../assets/img/svg/calculator-svgrepo-com.svg";
import event from "../assets/img/svg/calendar-svgrepo-com.svg";
import contact from "../assets/img/svg/email-mail-svgrepo-com.svg";
import todo from "../assets/img/svg/gui-todo-list-svgrepo-com.svg";
import weather from "../assets/img/svg/weather-color-moon-cloud-light-svgrepo-com.svg";
import recipe from "../assets/img/svg/recipe-svgrepo-com.svg";
import { AppContext } from "../contexts/appContext";

const Sidebar = forwardRef(({ collapsed }, ref) => {
  const { logout, currentUser } = useContext(AppContext);

  return (
    <aside
      ref={ref}
      className={`
        fixed h-full overflow-auto bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 
        transition-all duration-300 ease-in-out z-50
        ${collapsed ? "w-16 p-3" : "w-64 p-5"}
      `}
    >
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-8">
        <Link className=" hover:text-gray-600 transition-colors" to="/">
          <img
            src={logoLight}
            alt="Logo"
            className={`bg-slate-400 mx-auto transition-all ${
              collapsed ? "w-10 h-10" : "w-48"
            }`}
          />
        </Link>
        <div className="mt-4 w-full">
          {currentUser ? (
            <div className="flex flex-col items-center gap-2">
              {collapsed ? <span className="text-lg font-bold uppercase bg-gray-300 dark:bg-gray-600 p-2 rounded-full">{currentUser.username.charAt(0)}</span> : `Welcome, ${currentUser.username}!`}
              <button
                className={`
                  w-full flex items-center justify-center
                  bg-red-500 hover:bg-red-600 dark:bg-red-700 dark:hover:bg-red-800 
                  text-white rounded-lg transition-colors
                  ${collapsed ? "p-2" : "py-2 px-4"}
                `}
                onClick={() => {
                  logout();
                  alert("User logged out");
                }}
              >
                {collapsed ? <span className="text-lg">🔒</span> : "Logout"}
              </button>
            </div>
          ) : (
            <NavLink
              className={`
                w-full flex items-center justify-center
                bg-blue-500 hover:bg-blue-600 dark:bg-blue-700 dark:hover:bg-blue-800 
                text-white rounded-lg transition-colors
                ${collapsed ? "p-2" : "py-2 px-4"}
              `}
              to="/login"
            >
              {collapsed ? <span className="text-lg">🔑</span> : "Login"}
            </NavLink>
          )}
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col space-y-1">
        {[
          { id: 1, label: "Posts", path: "/posts", src: blog, alt: "blog" },
          { id: 2, label: "Event", path: "/event", src: event, alt: "event" },
          {
            id: 3,
            label: "Working Hours",
            path: "/working-hours",
            src: hour,
            alt: "working-hours",
          },
          { id: 4, label: "Todo", path: "/todo", src: todo, alt: "todo" },
          {
            id: 5,
            label: "Recipe",
            path: "/recipe",
            src: recipe,
            alt: "recipe",
          },
          {
            id: 6,
            label: "Weather",
            path: "/weather",
            src: weather,
            alt: "weather",
          },
          {
            id: 7,
            label: "Contact",
            path: "/contact",
            src: contact,
            alt: "contact",
          },
        ].map((navbarLink) => (
          <div key={navbarLink.id} className="mb-4">
            {!collapsed && (
              <p className="font-semibold text-sm uppercase text-gray-500 dark:text-gray-400 mb-2 pl-2 text-center">
                {navbarLink.label}
              </p>
            )}
            <div className="space-y-1">
              <NavLink
                to={navbarLink.path}
                className={({ isActive }) => `
                    flex items-center rounded-lg p-3 transition-all
                    hover:bg-blue-100 dark:hover:bg-gray-800
                    ${
                      isActive
                        ? "bg-blue-100 dark:bg-gray-800 text-blue-600 dark:text-blue-400 font-medium"
                        : "hover:text-blue-600 dark:hover:text-blue-400"
                    }
                    ${collapsed ? "justify-center" : "pl-4"}
                  `}
              >
                <img
                  src={navbarLink.src}
                  alt={navbarLink.alt}
                  className={`${collapsed ? "" : "mr-3"}`}
                />
                {/* {!collapsed && <span>{navbarLink.label}</span>} */}
              </NavLink>
            </div>
          </div>
        ))}
      </div>
    </aside>
  );
});

export default Sidebar;

