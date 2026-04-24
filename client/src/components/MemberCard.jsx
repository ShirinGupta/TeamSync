import { Link } from 'react-router-dom';
import { User, Mail } from 'lucide-react';

const MemberCard = ({ member }) => {
  // Construct the image URL based on where the server is running
  const imageUrl = member.image.startsWith('/') 
    ? `http://localhost:5000${member.image}` 
    : member.image;

  return (
    <div className="card">
      <div style={{ padding: '2rem 1.5rem', textAlign: 'center' }}>
        <div 
          style={{ 
            width: '100px', 
            height: '100px', 
            borderRadius: '50%', 
            margin: '0 auto 1.5rem',
            overflow: 'hidden',
            border: '3px solid var(--border-color)'
          }}
        >
          <img 
            src={imageUrl} 
            alt={member.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }} // Fallback
          />
        </div>
        <h3 className="mb-4">{member.name}</h3>
        <p className="text-muted mb-4 flex items-center justify-center gap-2">
          <User size={16} />
          {member.role}
        </p>
        <Link to={`/member/${member._id}`} className="btn btn-outline" style={{ width: '100%' }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default MemberCard;
