import Back from "./Components/Back";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./Components/Front";
import LoginPage from "./Components/LoginPage";
import LogoutPage from "./Components/LogoutPage";
import RequireAuth from "./Components/RequireAuth";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/logout" element={<LogoutPage />} />
        <Route index element={<Front show="all" />} />
        {/* <Route path="admin" element={<Back />}></Route> */}
        <Route
          path="/admin"
          element={
            <RequireAuth>
              <Back />
            </RequireAuth>
          }
        ></Route>{" "}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
