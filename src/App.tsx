import Header from "Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "components/Home";
import { AuthProvider } from "contexts/AuthProvider";
import Login from "components/authentication/Login";
import Registration from "components/authentication/Registration";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Registration />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
