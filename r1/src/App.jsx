import Back from "./Components/Back";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Front from "./Components/Front";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Front show="all" />} />

        <Route path="admin" element={<Back />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
