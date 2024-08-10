import { BrowserRouter, Route, Routes } from "react-router-dom";
import AddCreators from "./pages/AddCreators";
import EditCreators from "./pages/EditCreators";
import ViewCreator from "./pages/ViewCreator";
import ShowCreators from "./pages/ShowCreators";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ShowCreators />} />
        <Route path="/add" element={<AddCreators />} />
        <Route path="/:id" element={<ViewCreator />} />
        <Route path="/:id/edit" element={<EditCreators />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
