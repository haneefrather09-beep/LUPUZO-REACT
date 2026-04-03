import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaTrash, FaPlus, FaArrowLeft, FaUpload, FaSpinner, FaLock } from 'react-icons/fa';
import { getTestimonials, addTestimonial, deleteTestimonial } from './Store';
import './Admin.css';

export default function Admin() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [text, setText] = useState('');
  const [mediaFile, setMediaFile] = useState(null);
  const [mediaPreview, setMediaPreview] = useState(null);
  const [mediaType, setMediaType] = useState('');
  const [loading, setLoading] = useState(false);

  // Authentication State
  const [token, setToken] = useState(sessionStorage.getItem('adminToken') || '');
  const [loginInput, setLoginInput] = useState('');

  useEffect(() => {
    loadItems();
  }, []);

  const loadItems = async () => {
    const data = await getTestimonials();
    setItems(data);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if(loginInput.trim()) {
      setToken(loginInput.trim());
      sessionStorage.setItem('adminToken', loginInput.trim());
    }
  };

  const handleLogout = () => {
    setToken('');
    sessionStorage.removeItem('adminToken');
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setMediaFile(file);
      setMediaType(file.type.startsWith('video') ? 'video' : 'image');
      setMediaPreview(URL.createObjectURL(file)); 
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!name || (!text && !mediaFile)) return;

    setLoading(true);

    const formData = new FormData();
    formData.append('name', name);
    formData.append('role', role);
    formData.append('text', text);
    if (mediaFile) {
      formData.append('media', mediaFile);
    }

    try {
      await addTestimonial(formData, token);
      
      // Reload items from PHP DB
      await loadItems();

      // Reset Form
      setName('');
      setRole('');
      setText('');
      setMediaFile(null);
      setMediaPreview(null);
      setMediaType('');
      alert("Successfully Added!");
    } catch (err) {
      alert("Failed to upload: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleRemove = async (id) => {
    if(!window.confirm("Are you sure you want to delete this?")) return;
    try {
      await deleteTestimonial(id, token);
      await loadItems();
    } catch (err) {
      alert("Error deleting: " + err.message);
    }
  };

  if (!token) {
    return (
      <div className="admin-page" style={{display:'flex', alignItems:'center', justifyContent:'center'}}>
        <div className="form-panel" style={{maxWidth: '400px', width: '100%', textAlign: 'center'}}>
          <div style={{fontSize: '3rem', color: '#06b6d4', marginBottom: '1rem'}}><FaLock /></div>
          <h2>Admin Login</h2>
          <form onSubmit={handleLogin} className="admin-form">
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Enter Secret Key..." 
                value={loginInput}
                onChange={e => setLoginInput(e.target.value)}
                required
                autoFocus
              />
            </div>
            <button type="submit" className="btn-add" style={{width: '100%', justifyContent: 'center'}}>Login</button>
          </form>
          <button className="btn-back" style={{marginTop: '1rem', width: '100%', justifyContent: 'center'}} onClick={() => navigate('/')}>
            <FaArrowLeft /> Back to Website
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Dashboard Panel</h1>
        <div style={{display:'flex', gap:'1rem'}}>
          <button className="btn-back" onClick={handleLogout}>Logout</button>
          <button className="btn-back" onClick={() => navigate('/')}>
            <FaArrowLeft /> Back to Website
          </button>
        </div>
      </div>

      <div className="admin-grid">
        <div className="form-panel">
          <h2>Add Client Testimonial</h2>
          <form className="admin-form" onSubmit={handleAdd}>
            <div className="form-group">
              <label>Client Name</label>
              <input type="text" value={name} onChange={e => setName(e.target.value)} required placeholder="e.g. John Doe" />
            </div>
            
            <div className="form-group">
              <label>Client Role / Company</label>
              <input type="text" value={role} onChange={e => setRole(e.target.value)} placeholder="e.g. CEO at TechCorp" />
            </div>

            <div className="form-group">
              <label>Testimonial Text / Description</label>
              <textarea value={text} onChange={e => setText(e.target.value)} placeholder="What did they say about our services?" required />
            </div>

            <div className="form-group">
              <label>Upload Client Image or Video (Optional)</label>
              <div className="file-upload-box">
                <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
                <div style={{ fontSize: '2rem', color: '#06b6d4' }}><FaUpload /></div>
                <p>Click or drag file to upload</p>
                <small style={{ color: '#64748b' }}>Supports Images (PNG, JPG) and Videos (MP4) max 50MB</small>
              </div>
              
              {mediaPreview && (
                <div className="file-preview">
                  {mediaType === 'video' ? (
                    <video src={mediaPreview} controls muted autoPlay loop />
                  ) : (
                    <img src={mediaPreview} alt="Preview" />
                  )}
                </div>
              )}
            </div>

            <button type="submit" className="btn-add" style={{ width: '100%', justifyContent: 'center' }} disabled={loading}>
              {loading ? <FaSpinner className="spinner" /> : <FaPlus />} 
              {loading ? ' Uploading...' : ' Add to Slideshow'}
            </button>
          </form>
        </div>

        <div className="list-panel">
          <h2>Manage Testimonials</h2>
          {items.length === 0 ? (
            <p style={{ color: '#94a3b8' }}>No testimonials added yet. Add one from the form.</p>
          ) : (
            <div className="testimonials-list">
              {items.map(item => (
                <div key={item.id} className="testimonial-item">
                  {item.media && (
                    <div className="test-media">
                      {item.mediaType === 'video' ? (
                        <video src={item.media} muted autoPlay loop />
                      ) : (
                        <img src={item.media} alt={item.name} />
                      )}
                    </div>
                  )}
                  <div className="test-info">
                    <h3>{item.name}</h3>
                    <p style={{ color: '#38bdf8', fontSize: '0.85rem', marginBottom: '0.5rem' }}>{item.role}</p>
                    <p>"{item.text}"</p>
                    <button className="btn-remove" onClick={() => handleRemove(item.id)}>
                      <FaTrash /> Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
