import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { ArrowLeft, Mail, Phone, Briefcase, Edit2, Trash2 } from 'lucide-react';
import { showToast } from '../utils/toast';

const MemberDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [member, setMember] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleting, setDeleting] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/members/${id}`);
        setMember(res.data);
      } catch (err) {
        console.error('Error fetching member:', err);
        setError('Member not found or server error.');
      } finally {
        setLoading(false);
      }
    };

    fetchMember();
  }, [id]);

  const handleDelete = async () => {
    setDeleting(true);
    try {
      await axios.delete(`http://localhost:5000/api/members/${id}`);
      showToast('Member deleted successfully!', 'success');
      navigate('/members');
    } catch (error) {
      console.error('Error deleting member:', error);
      showToast('Error deleting member. Please try again.', 'error');
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="loader mb-4"></div>
        <p className="text-muted">Loading member details...</p>
      </div>
    );
  }

  if (error || !member) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="alert alert-error" style={{ maxWidth: '600px', margin: '0 auto' }}>
          {error}
        </div>
        <button onClick={() => navigate('/members')} className="btn btn-outline mt-4">
          <ArrowLeft size={16} /> Back to Members
        </button>
      </div>
    );
  }

  const imageUrl = member.image.startsWith('/') 
    ? `http://localhost:5000${member.image}` 
    : member.image;

  return (
    <div>
      <button onClick={() => navigate('/members')} className="btn btn-outline mb-6">
        <ArrowLeft size={16} /> Back to Members
      </button>

      <div className="card detail-card">
        <img 
          src={imageUrl} 
          alt={member.name} 
          className="detail-image"
          onError={(e) => { e.target.src = 'https://via.placeholder.com/150'; }}
        />
        
        <h2>{member.name}</h2>
        <p className="text-muted mb-6" style={{ fontSize: '1.125rem' }}>{member.role}</p>

        <div className="detail-info">
          <div className="info-row">
            <span className="info-label flex items-center gap-2">
              <Briefcase size={16} /> Role
            </span>
            <span className="info-value">{member.role}</span>
          </div>
          
          <div className="info-row">
            <span className="info-label flex items-center gap-2">
              <Mail size={16} /> Email
            </span>
            <span className="info-value">
              <a href={`mailto:${member.email}`} style={{ color: 'var(--primary-color)' }}>
                {member.email}
              </a>
            </span>
          </div>
          
          <div className="info-row">
            <span className="info-label flex items-center gap-2">
              <Phone size={16} /> Contact
            </span>
            <span className="info-value">{member.contact}</span>
          </div>
        </div>

        <div className="button-group" style={{ marginTop: '2rem' }}>
          <button 
            onClick={() => navigate(`/edit-member/${id}`)} 
            className="btn btn-primary"
          >
            <Edit2 size={16} /> Edit Member
          </button>
          <button 
            onClick={() => setShowDeleteConfirm(true)} 
            className="btn btn-danger"
          >
            <Trash2 size={16} /> Delete Member
          </button>
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => !deleting && setShowDeleteConfirm(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h3>Delete Member?</h3>
            <p>Are you sure you want to delete <strong>{member.name}</strong>? This action cannot be undone.</p>
            <div className="button-group">
              <button 
                className="btn btn-outline" 
                onClick={() => setShowDeleteConfirm(false)}
                disabled={deleting}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger" 
                onClick={handleDelete}
                disabled={deleting}
              >
                {deleting ? 'Deleting...' : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberDetails;
