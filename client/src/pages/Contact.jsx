// Contact page: collects simple message data and posts to the API.
import { useState } from 'react';
import { apiFetch } from '../api';

const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [status, setStatus] = useState(null);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setStatus('Sending...');
    try {
      await apiFetch('/public/contact', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
      setStatus('Message sent! Expect a reply soon.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      setStatus(error.message);
    }
  };

  return (
    <section>
      <h1>Contact</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name
          <input name="name" value={formData.name} onChange={handleChange} required />
        </label>
        <label>
          Email
          <input name="email" type="email" value={formData.email} onChange={handleChange} required />
        </label>
        <label>
          Message
          <textarea name="message" value={formData.message} onChange={handleChange} required />
        </label>
        <button type="submit">Send</button>
      </form>
      {status && <p>{status}</p>}
    </section>
  );
};

export default Contact;
