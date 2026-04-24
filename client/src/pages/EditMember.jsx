import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Upload, ArrowLeft } from 'lucide-react';
import { showToast } from '../utils/toast';
import { validateFormData, getErrorMessage } from '../utils/validation';

const EditMember = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    role: '',
    email: '',
    contact: '',
  });
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [currentImage, setCurrentImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Fetch existing member data
  useEffect(() => {
    const fetchMember = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/members/${id}`);
        setFormData({
          name: res.data.name,
          role: res.data.role,
          email: res.data.email,
          contact: res.data.contact,
        });
        setCurrentImage(res.data.image);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching member:', error);
        showToast('Failed to load member data', 'error');
        navigate('/members');
      }
    };

    fetchMember();
  }, [id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    // Clear error for this field when user starts typing
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: '' });
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate form
    const validation = validateFormData(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      showToast(getErrorMessage(validation.errors), 'error');
      return;
    }

    setSubmitting(true);

    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('role', formData.role);
      data.append('email', formData.email);
      data.append('contact', formData.contact);
      if (image) {
        data.append('image', image);
      }

      await axios.put(`http://localhost:5000/api/members/${id}`, data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      showToast('Member updated successfully!', 'success');
      navigate(`/member/${id}`);
    } catch (error) {
      console.error('Error updating member:', error);
      showToast(error.response?.data?.message || 'Error updating member. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="text-center" style={{ padding: '4rem 0' }}>
        <div className="loader mb-4"></div>
        <p className="text-muted">Loading member data...</p>
      </div>
    );
  }

  const displayImage = preview || (currentImage?.startsWith('/') 
    ? `http://localhost:5000${currentImage}` 
    : currentImage);

  return (
    <div>
      <button onClick={() => navigate(`/member/${id}`)} className="btn btn-outline mb-6">
        <ArrowLeft size={16} /> Back to Member
      </button>

      <div className="form-card card">
        <h2 className="text-center mb-6">Edit Team Member</h2>

        <form onSubmit={handleSubmit}>
          <div className="image-preview-container">
            {displayImage ? (
              <img src={displayImage} alt="Preview" className="image-preview" />
            ) : (
              <div className="text-muted text-center flex flex-col items-center justify-center">
                <Upload size={32} />
                <span style={{ fontSize: '0.75rem', marginTop: '0.5rem' }}>No image</span>
              </div>
            )}
          </div>

          <div className="form-group text-center">
            <label htmlFor="image-upload" className="btn btn-outline" style={{ cursor: 'pointer' }}>
              Change Profile Image
            </label>
            <input 
              id="image-upload" 
              type="file" 
              accept="image/*" 
              onChange={handleImageChange} 
              style={{ display: 'none' }}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Full Name *</label>
            <input 
              type="text" 
              name="name" 
              className={`form-control ${errors.name ? 'form-control-error' : ''}`}
              value={formData.name} 
              onChange={handleChange} 
              placeholder="John Doe"
              required
            />
            {errors.name && <span className="error-text">{errors.name}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Role / Position *</label>
            <input 
              type="text" 
              name="role" 
              className={`form-control ${errors.role ? 'form-control-error' : ''}`}
              value={formData.role} 
              onChange={handleChange} 
              placeholder="Frontend Developer"
              required
            />
            {errors.role && <span className="error-text">{errors.role}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Email Address *</label>
            <input 
              type="email" 
              name="email" 
              className={`form-control ${errors.email ? 'form-control-error' : ''}`}
              value={formData.email} 
              onChange={handleChange} 
              placeholder="john@example.com"
              required
            />
            {errors.email && <span className="error-text">{errors.email}</span>}
          </div>

          <div className="form-group">
            <label className="form-label">Contact Number *</label>
            <input 
              type="tel" 
              name="contact" 
              className={`form-control ${errors.contact ? 'form-control-error' : ''}`}
              value={formData.contact} 
              onChange={handleChange} 
              placeholder="+1 (555) 000-0000"
              required
            />
            {errors.contact && <span className="error-text">{errors.contact}</span>}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            disabled={submitting}
            style={{ width: '100%' }}
          >
            {submitting ? 'Updating...' : 'Update Member'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditMember;
