import "./App.css";
import Header from "./components/Header";
import LoginPage from "./routes/LoginPage";
import HomePage from "./routes/HomePage";
import ArtTasks from "./routes/ArtTasks";
import ArtTaskDetails from "./routes/ArtTaskDetails";
import Missing from "./routes/Missing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="App">
        <Header />

        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/art-tasks" element={<ArtTasks />} />
          <Route path="/art-tasks/:id" element={<ArtTaskDetails />} />
          <Route path="/missing" element={<Missing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
