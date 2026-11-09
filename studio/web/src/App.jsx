import { useContext } from "react";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider } from "./contexts/theme-context";
import Layout from "./layout/Layout";
import Home from "./pages/Home";
import Event from "./pages/event/Event";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Blog from "./pages/blog/Blog";
import Write from "./pages/blog/Write";
import Single from "./pages/blog/Single";
import Search from "./pages/blog/Search";
import WorkingHours from "./pages/WorkingHours";
import Todo from "./pages/todo/Todo";
import FoodRecipe from "./pages/recipe/FoodRecipe";
import Recipe from "./pages/recipe/Recipe";
import { AppContext } from "./contexts/appContext";
import Weather from "./pages/weather/Weather";
import "./assets/style.css";
import AuthChecker from "./components/AuthChecker";

function App() {
  const { currentUser } = useContext(AppContext);

  return (
    // <BrowserRouter basename="/will-pgm-studio-vite">
    <ThemeProvider storageKey="theme">
      <BrowserRouter>
        <AuthChecker />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="event" element={<Event />} />
            <Route path="contact" element={<Contact />} />
            {!currentUser && <Route path="login" element={<Login />} />}
            <Route path="register" element={<Register />} />
            <Route path="posts" element={<Blog />} />
            <Route path="posts/write" element={<Write />} />
            <Route path="posts/write/:id" element={<Write />} />
            <Route path="posts/search" element={<Search />} />
            <Route path="posts/:id" element={<Single />} />
            <Route path="working-hours" element={<WorkingHours />} />
            <Route path="todo" element={<Todo />} />
            <Route path="recipe" element={<FoodRecipe />} />
            <Route path="recipe/:id" element={<Recipe />} />
            <Route path="/weather" element={<Weather />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
