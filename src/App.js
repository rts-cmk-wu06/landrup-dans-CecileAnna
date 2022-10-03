import LoginPage from "./routes/LoginPage";
import Missing from "./routes/Missing";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Welcome from "./routes/Welcome";
import Activities from "./routes/Activities";
import Search from "./routes/Search";
import ActivityDetails from "./routes/ActivityDetails";
import ClassOverview from "./routes/ClassOverview";

function App() {
  return (
    <Router>
      <div className="App">

        <Routes>
          <Route path="/" element={<Welcome />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/Search" element={<Search />} />
          <Route path="/activity-details/:id" element={<ActivityDetails />} />
          <Route path="/class-overview/:id" element={<ClassOverview />} />
          <Route path="/missing" element={<Missing />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
