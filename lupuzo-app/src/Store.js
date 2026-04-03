// Replace Base URL depending on deployment.
// For dev env, adjust it to where your PHP server is running, usually 'http://localhost/api'
const API_BASE = '/api';

export const getTestimonials = async () => {
  try {
    const res = await fetch(`${API_BASE}/get_testimonials.php`);
    if (!res.ok) throw new Error('API fetch error');
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (err) {
    console.error('Error fetching testimonials:', err);
    return [];
  }
};

// Now this takes raw parameters (FormData) directly
export const addTestimonial = async (formData, token) => {
  try {
    const res = await fetch(`${API_BASE}/add_testimonial.php`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData,
    });
    if (!res.ok) {
      const e = await res.json();
      throw new Error(e.error || 'Failed to create testimonial');
    }
    return await res.json();
  } catch (err) {
    console.error('Error saving testimonial:', err);
    throw err;
  }
};

export const deleteTestimonial = async (id, token) => {
  try {
    const res = await fetch(`${API_BASE}/delete_testimonial.php?id=${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if (!res.ok) {
      const e = await res.json();
      throw new Error(e.error || 'Failed to delete testimonial');
    }
    return await res.json();
  } catch (err) {
    console.error('Error deleting testimonial:', err);
    throw err;
  }
};
