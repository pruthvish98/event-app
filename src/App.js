import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AddEvent from "./pages/AddEvent";
import EventList from "./pages/EventList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path={`/`} element={<EventList />} />
        <Route path={`/add-event`} element={<AddEvent isEditing={false} />} />
        <Route path={`/edit-event`} element={<AddEvent isEditing={true} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
