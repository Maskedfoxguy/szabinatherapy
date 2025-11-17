// Admin login page: handles credential submission to the API.
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../../api';

const AdminLogin = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError(null);
    try {
      await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      navigate('/admin/dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <section>
      <h1>Admin Login</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Password
          <input type="password" name="password" value={formData.password} onChange={handleChange} required />
        </label>
        <button type="submit">Log in</button>
      </form>
      {error && <p>{error}</p>}
    </section>
  );
};

export default AdminLogin;
