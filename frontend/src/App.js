import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import Team from "./pages/Team";
import Research from "./pages/Research";
import Publications from "./pages/Publications";
import Contact from "./pages/Contact";
import Layout from "./Layout";
import ResearchDetailPage from "./pages/ResearchDetailPage";
import Opportunities from "./pages/Opportunities";
import AdminRedirect from './pages/AdminRedirect';

function App() {
  return (
    <Router >
      <Routes>
        <Route
          path="/admin"
          element={<AdminRedirect />}
        />
        <Route path="/" element={<Layout />} >
          <Route index element={<Home />} />
          <Route path="/news" element={<News />} />
          <Route path="/team" element={<Team />} />
          <Route path="/research" element={<Research />} />
          <Route path="/research/:slug" element={<ResearchDetailPage />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/contact" element={<Contact />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
