// App component: declares the high-level routes for the SPA.
import { Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import AdminLogin from './pages/Admin/Login';
import AdminDashboard from './pages/Admin/Dashboard';

const App = () => (
  <div>
    <header>
      <nav>
        <Link to="/">Home</Link> | <Link to="/about">About</Link> |{' '}
        <Link to="/contact">Contact</Link> | <Link to="/admin/login">Admin</Link>
      </nav>
    </header>
    <main>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
      </Routes>
    </main>
  </div>
);

export default App;
