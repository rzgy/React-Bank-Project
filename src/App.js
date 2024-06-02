import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/Users";
import Navbar from "./components/Navbar";
import Profile from "./pages/Profile";
import { useState, useEffect } from "react";
import UserContext from "./Context/userContext";
import { checkToken } from "./api/auth";
import Transactions from "./pages/Transactions";
import Account from "./pages/Account";

function App() {
  const [user, setUser] = useState(false);

  useEffect(() => {
    setUser(checkToken());
  }, []);

  return (
    <UserContext.Provider value={[user, setUser]}>
      <div>
        <Navbar />
        <Routes>
          <Route path="/" Component={Home} />

          <Route path="/login" Component={Login} />
          <Route path="/register" Component={Register} />
          <Route path="/users" Component={Users} />
          <Route path="/profile" Component={Profile} />
          <Route path="/Transactions" Component={Transactions} />
          <Route path="/Account" Component={Account} />
        </Routes>
      </div>
    </UserContext.Provider>
  );
}

export default App;
