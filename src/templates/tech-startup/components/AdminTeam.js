import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AdminTeam = ({ tenantId }) => {
  const [teamMembers, setTeamMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    position: '',
    bio: '',
    image: '',
    linkedinUrl: '',
    twitterUrl: ''
  });

  useEffect(() => {
    fetchTeamMembers();
  }, [tenantId]);

  const fetchTeamMembers = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/templates/tech-startup/team', {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setTeamMembers(data.data);
      }
    } catch (error) {
      console.error('Error fetching team members:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingMember 
        ? `/api/templates/tech-startup/team/${editingMember.id}`
        : '/api/templates/tech-startup/team';
      
      const method = editingMember ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(formData)
      });

      const data = await response.json();
      if (data.success) {
        fetchTeamMembers();
        resetForm();
      }
    } catch (error) {
      console.error('Error saving team member:', error);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this team member?')) return;
    
    try {
      const response = await fetch(`/api/templates/tech-startup/team/${id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      if (data.success) {
        fetchTeamMembers();
      }
    } catch (error) {
      console.error('Error deleting team member:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      position: '',
      bio: '',
      image: '',
      linkedinUrl: '',
      twitterUrl: ''
    });
    setEditingMember(null);
    setShowForm(false);
  };

  const handleEdit = (member) => {
    setFormData({
      name: member.name,
      position: member.position,
      bio: member.bio,
      image: member.image || '',
      linkedinUrl: member.linkedinUrl || '',
      twitterUrl: member.twitterUrl || ''
    });
    setEditingMember(member);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Team Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
        >
          Add Team Member
        </button>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <motion.div
            key={member.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-lg shadow-md p-6 border border-gray-200"
          >
            <div className="flex items-start justify-between mb-4">
              <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden">
                {member.image ? (
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-2xl text-gray-500">
                    {member.name.charAt(0).toUpperCase()}
                  </span>
                )}
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(member)}
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(member.id)}
                  className="text-red-600 hover:text-red-800 text-sm"
                >
                  Delete
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {member.name}
            </h3>
            
            <p className="text-blue-600 text-sm mb-3">
              {member.position}
            </p>
            
            <p className="text-gray-600 text-sm mb-4 line-clamp-3">
              {member.bio}
            </p>
            
            <div className="flex space-x-3">
              {member.linkedinUrl && (
                <a
                  href={member.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 text-sm"
                >
                  LinkedIn
                </a>
              )}
              {member.twitterUrl && (
                <a
                  href={member.twitterUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-600 text-sm"
                >
                  Twitter
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      {/* Add/Edit Form Modal */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto"
            >
              <h3 className="text-xl font-bold mb-4">
                {editingMember ? 'Edit Team Member' : 'Add New Team Member'}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Position
                    </label>
                    <input
                      type="text"
                      value={formData.position}
                      onChange={(e) => setFormData(prev => ({ ...prev, position: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Bio
                  </label>
                  <textarea
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    rows={4}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Profile Image URL
                  </label>
                  <input
                    type="url"
                    value={formData.image}
                    onChange={(e) => setFormData(prev => ({ ...prev, image: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="https://example.com/profile.jpg"
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      LinkedIn URL
                    </label>
                    <input
                      type="url"
                      value={formData.linkedinUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, linkedinUrl: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://linkedin.com/in/username"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Twitter URL
                    </label>
                    <input
                      type="url"
                      value={formData.twitterUrl}
                      onChange={(e) => setFormData(prev => ({ ...prev, twitterUrl: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="https://twitter.com/username"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={resetForm}
                    className="px-4 py-2 text-gray-600 hover:text-gray-800"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    {editingMember ? 'Update Team Member' : 'Add Team Member'}
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AdminTeam;
