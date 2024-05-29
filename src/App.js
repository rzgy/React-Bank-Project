import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/" Component={Home} />

        <Route path="/login" Component={Login} />
        <Route path="/register" Component={Register} />
        <Route path="/users" Component={Users} />
      </Routes>
    </div>
  );
}

export default App;
