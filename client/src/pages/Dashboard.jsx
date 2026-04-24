import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { Users, Briefcase, BarChart3, UserPlus } from 'lucide-react';

const Dashboard = () => {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/members/stats/summary');
        setStats(res.data);
      } catch (err) {
        console.error('Error fetching stats:', err);
        setFetchError('Failed to load statistics');
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  if (loading) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="loader mb-4"></div>
        <p className="text-muted">Loading statistics...</p>
      </div>
    );
  }

  if (fetchError) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {fetchError}
        </div>
      </div>
    );
  }

  return (
    <div>
      <div className="text-center mb-8">
        <div style={{ display: 'inline-flex', padding: '1rem', backgroundColor: 'var(--primary-color)', color: 'white', borderRadius: '50%', marginBottom: '1rem' }}>
          <BarChart3 size={48} />
        </div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>Team Dashboard</h1>
        <p className="text-muted" style={{ fontSize: '1.125rem' }}>Overview of your team members and statistics</p>
      </div>

      {/* Stats Grid */}
      <div className="stats-grid">
        <div className="stat-card card">
          <div className="stat-icon total-members">
            <Users size={32} />
          </div>
          <h3>{stats?.totalMembers || 0}</h3>
          <p className="text-muted">Total Members</p>
        </div>

        <div className="stat-card card">
          <div className="stat-icon unique-roles">
            <Briefcase size={32} />
          </div>
          <h3>{stats?.roleStats?.length || 0}</h3>
          <p className="text-muted">Unique Roles</p>
        </div>
      </div>

      {/* Role Breakdown */}
      {stats?.roleStats && stats.roleStats.length > 0 && (
        <div className="card" style={{ marginTop: '2rem', padding: '2rem' }}>
          <h2 className="mb-6">Members by Role</h2>
          <div className="role-breakdown">
            {stats.roleStats.map((role, index) => (
              <div key={index} className="role-item">
                <div className="role-header">
                  <span className="role-name">{role._id}</span>
                  <span className="role-count">{role.count}</span>
                </div>
                <div className="role-bar">
                  <div 
                    className="role-fill" 
                    style={{ width: `${(role.count / stats.totalMembers) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions */}
      <div className="card" style={{ marginTop: '2rem', padding: '2rem', textAlign: 'center' }}>
        <h2 className="mb-6">Quick Actions</h2>
        <div className="button-group">
          <Link to="/add-member" className="btn btn-primary">
            <UserPlus size={20} />
            Add New Member
          </Link>
          <Link to="/members" className="btn btn-outline">
            <Users size={20} />
            View All Members
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
