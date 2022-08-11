import { useContext } from "react";
import "./app.scss";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home";
import User from "./layout/User";
import NoUser from "./layout/NoUser";
import Register from "./pages/register/Register";
import Watch from "./pages/watch/Watch";
import Login from "./pages/login/Login";
import { AuthContext } from "./authContext/AuthContext";
const App = () => {
  const { user } = useContext(AuthContext);
  return (
    <Routes>
      <Route element={<User user={user} />}>
        <Route path="/" element={<Home />}></Route>
        <Route path="movies" element={<Home type="movies" />}></Route>
        <Route path="series" element={<Home type="series" />}></Route>
        <Route path="watch" element={<Watch />}></Route>
      </Route>
      <Route element={<NoUser user={user} />}>
        <Route path="register" element={<Register />}></Route>
        <Route path="login" element={<Login />}></Route>
      </Route>
    </Routes>
  );
};

export default App;
