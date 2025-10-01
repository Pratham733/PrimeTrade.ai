import { useAuth } from '../context/useAuth';
import '../styles/global.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <h1 className="welcome-title">
          Welcome back{user?.name ? `, ${user.name}` : ', prooo'}!
        </h1>
        <p className="welcome-subtitle">Quick overview of your account and tasks</p>
      </div>

      {/* Profile Section */}
      <div className="section-card profile-card">
        <h2 className="section-title">Profile</h2>
        <div className="profile-info">
          <p className="profile-item"><span className="profile-label">Name:</span> {user?.name || 'prece'}</p>
          <p className="profile-item"><span className="profile-label">Email:</span> {user?.email || 'ager.tom'}</p>
          <p className="profile-item"><span className="profile-label">Bio:</span> {user?.bio || '—'}</p>
        </div>
      </div>

      {/* Getting Started Section */}
      <div className="section-card getting-started-card">
        <h2 className="section-title">Getting started</h2>
        <ul className="getting-started-list">
          <li>Add your tasks</li>
          <li>Browse through pages</li>
          <li>Update your profile</li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;