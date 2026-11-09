import { useLocation } from "react-router-dom";

const Header = ({ toggleAdd, showAddTask, setEditTask }) => {
  const location = useLocation();

  return (
    <section className="text-center py-4">
      <h1 className="text-3xl font-bold">Todo List</h1>
      {location.pathname === "/todo" && (
        <button
          className={`px-4 py-2 mt-3 text-white font-semibold rounded ${
            showAddTask ? "bg-red-500 hover:bg-red-600" : "bg-green-500 hover:bg-green-600"
          }`}
          onClick={() => {
            toggleAdd();
            setEditTask('');
          }}
        >
          {showAddTask ? "Cancel" : "Add"}
        </button>
      )}
    </section>
  );
};

export default Header;