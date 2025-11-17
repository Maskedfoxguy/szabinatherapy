// Admin dashboard: placeholder shell with quick links for future widgets.
import { Link } from 'react-router-dom';

const AdminDashboard = () => (
  <section>
    <h1>Admin Dashboard</h1>
    <p>Once authenticated, admins can use this shell to review audits and manage bookings.</p>
    <ul>
      <li>
        <Link to="#audit">Audit Logs</Link> – coming soon, will pull from /api/audit
      </li>
      <li>
        <Link to="#bookings">Bookings</Link> – schedule overview powered by the booking API
      </li>
    </ul>
  </section>
);

export default AdminDashboard;
