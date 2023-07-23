import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Navbar from "./pages/Navbar";
import Profil from "./pages/Profil";
import EditProfil from "./pages/EditProfil";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";
import Home from "./pages/Home";
import Protected from "./pages/Protected";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
        <Route path='/login' element={<Login />} />
        <Route path="/user" element={<Protected />}>
          <Route path='profil/:id' element={<Profil />} />
          <Route path='edit-profil/:id' element={<EditProfil />} />
          <Route path='add-post/:id' element={<AddPost />} />
          <Route path='edit-post/:id' element={<EditPost />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
