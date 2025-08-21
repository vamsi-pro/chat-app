import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/login";
import Navbar from "./components/Navbar";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ErrorPage from "./components/ErrorPage";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import { useDispatch, useSelector } from "react-redux";
import { checkAuth } from "./redux/authSlice";
import { useEffect } from "react";
import { Loader } from "lucide-react";

function App() {
  const dispatch = useDispatch();
  const { loading, authenticated, user } = useSelector((state) => state.auth);

  console.log("selector", loading, authenticated, user);

  useEffect(() => {
    dispatch(checkAuth());
  }, [dispatch]);

  if (loading && !authenticated && !user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="size-10 animate-spin" />
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={authenticated ? <Home /> : <Navigate to={"/login"} />}
        />
        <Route
          path="/login"
          element={!authenticated ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/register"
          element={!authenticated ? <Register /> : <Navigate to="/" />}
        />
        <Route
          path="/profile"
          element={authenticated ? <Profile /> : <Navigate to="/login" />}
        />
        <Route path="/settings" element={<Settings />} />
        <Route path="*" element={<ErrorPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
