import { Link } from 'react-router-dom';
import { Users, UserPlus } from 'lucide-react';

const Home = () => {
  return (
    <div className="text-center" style={{ padding: '4rem 0' }}>
      <div 
        style={{ 
          display: 'inline-flex', 
          padding: '1rem', 
          backgroundColor: 'var(--primary-color)', 
          color: 'white', 
          borderRadius: '50%', 
          marginBottom: '2rem' 
        }}
      >
        <Users size={64} />
      </div>
      
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem' }}>
        Student Team Management
      </h1>
      
      <p className="text-muted" style={{ fontSize: '1.25rem', maxWidth: '600px', margin: '0 auto 3rem' }}>
        A streamlined platform to organize, view, and manage your academic team members effectively.
      </p>
      
      <div className="flex justify-center gap-4">
        <Link to="/add-member" className="btn btn-primary" style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
          <UserPlus size={20} />
          Add New Member
        </Link>
        <Link to="/members" className="btn btn-outline" style={{ padding: '0.875rem 1.5rem', fontSize: '1rem' }}>
          <Users size={20} />
          View All Members
        </Link>
      </div>
    </div>
  );
};

export default Home;
