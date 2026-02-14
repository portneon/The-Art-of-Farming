import React, { useState } from 'react';
import { Edit2, Save, X, Trash2, Loader2 } from 'lucide-react';

const GardenEditSidebar = ({ garden, isOpen, onClose, onUpdate, onDelete }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [name, setName] = useState(garden.name);
    const [description, setDescription] = useState(garden.description || '');
    const [loading, setLoading] = useState(false);
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [error, setError] = useState('');

    const handleSave = async () => {
        setError('');

        if (!name.trim()) {
            setError('Garden name is required');
            return;
        }

        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/gardens/${garden.id}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    },
                    body: JSON.stringify({
                        name: name.trim(),
                        description: description.trim() || null
                    })
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to update garden');
            }

            console.log('Garden updated:', data.data);
            setIsEditing(false);
            onUpdate(data.data);
        } catch (err) {
            console.error('Error updating garden:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async () => {
        try {
            setLoading(true);

            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/api/gardens/${garden.id}`,
                {
                    method: 'DELETE',
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`
                    }
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || 'Failed to delete garden');
            }

            console.log('Garden deleted');
            onDelete();
        } catch (err) {
            console.error('Error deleting garden:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleCancel = () => {
        setName(garden.name);
        setDescription(garden.description || '');
        setIsEditing(false);
        setError('');
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Mobile overlay */}
            <div
                className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 lg:hidden"
                onClick={onClose}
            />

            {/* Sidebar */}
            <div className="fixed lg:sticky top-0 right-0 h-screen w-full lg:w-80 bg-white shadow-2xl lg:shadow-none border-l border-[#1A2F1C]/10 z-50 overflow-y-auto">
                <div className="p-6 space-y-6">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                        <h3 className="font-serif text-2xl text-[#1A2F1C]">Garden Details</h3>
                        <button
                            onClick={onClose}
                            className="lg:hidden text-[#1A2F1C]/40 hover:text-[#C77D63] transition-colors"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    {/* Error message */}
                    {error && (
                        <div className="bg-red-50 border border-red-200 text-[#C77D63] px-4 py-3 rounded-lg text-sm">
                            {error}
                        </div>
                    )}

                    {/* Edit/View Mode Toggle */}
                    {!isEditing ? (
                        <div className="space-y-4">
                            <div>
                                <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                                    Garden Name
                                </label>
                                <p className="text-[#1A2F1C] font-sans text-lg">{garden.name}</p>
                            </div>

                            <div>
                                <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                                    Description
                                </label>
                                <p className="text-[#1A2F1C]/70 font-sans text-sm leading-relaxed">
                                    {garden.description || 'No description provided'}
                                </p>
                            </div>

                            <div>
                                <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                                    Plant Count
                                </label>
                                <p className="text-[#1A2F1C] font-sans text-lg">{garden.plantCount} plants</p>
                            </div>

                            <button
                                onClick={() => setIsEditing(true)}
                                className="w-full bg-[#1A2F1C] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#4A6741] transition-colors flex items-center justify-center gap-2"
                            >
                                <Edit2 size={16} />
                                Edit Garden
                            </button>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {/* Edit Name */}
                            <div>
                                <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                                    Garden Name *
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    maxLength={100}
                                    className="w-full bg-[#F4F5F0] border border-[#1A2F1C]/20 rounded-lg px-4 py-3 text-[#1A2F1C] focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-colors font-sans"
                                    disabled={loading}
                                />
                            </div>

                            {/* Edit Description */}
                            <div>
                                <label className="block font-mono text-xs text-[#4A6741] uppercase tracking-widest mb-2">
                                    Description
                                </label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    maxLength={500}
                                    rows={4}
                                    className="w-full bg-[#F4F5F0] border border-[#1A2F1C]/20 rounded-lg px-4 py-3 text-[#1A2F1C] focus:outline-none focus:border-[#4A6741] focus:ring-1 focus:ring-[#4A6741] transition-colors font-sans resize-none"
                                    disabled={loading}
                                />
                            </div>

                            {/* Save/Cancel Buttons */}
                            <div className="flex gap-3">
                                <button
                                    onClick={handleCancel}
                                    className="flex-1 bg-white border-2 border-[#1A2F1C]/20 text-[#1A2F1C] py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A2F1C]/5 transition-colors"
                                    disabled={loading}
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleSave}
                                    className="flex-1 bg-[#4A6741] text-white py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-[#1A2F1C] transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                    disabled={loading}
                                >
                                    {loading ? (
                                        <Loader2 className="animate-spin" size={16} />
                                    ) : (
                                        <>
                                            <Save size={16} />
                                            Save
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* Divider */}
                    <div className="border-t border-[#1A2F1C]/10 pt-6">
                        {/* Delete Garden */}
                        {!showDeleteConfirm ? (
                            <button
                                onClick={() => setShowDeleteConfirm(true)}
                                className="w-full bg-red-50 text-red-600 border border-red-200 py-3 rounded-full font-bold text-xs uppercase tracking-widest hover:bg-red-100 transition-colors flex items-center justify-center gap-2"
                                disabled={isEditing}
                            >
                                <Trash2 size={16} />
                                Delete Garden
                            </button>
                        ) : (
                            <div className="space-y-3">
                                <p className="text-sm text-red-600 font-sans text-center">
                                    Are you sure? This will also delete all {garden.plantCount} plants in this garden.
                                </p>
                                <div className="flex gap-3">
                                    <button
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="flex-1 bg-white border border-[#1A2F1C]/20 text-[#1A2F1C] py-2 rounded-full text-xs uppercase tracking-widest hover:bg-[#1A2F1C]/5 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleDelete}
                                        className="flex-1 bg-red-600 text-white py-2 rounded-full text-xs uppercase tracking-widest hover:bg-red-700 transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
                                        disabled={loading}
                                    >
                                        {loading ? (
                                            <Loader2 className="animate-spin" size={14} />
                                        ) : (
                                            'Delete'
                                        )}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Garden Info */}
                    <div className="bg-[#F4F5F0] rounded-lg p-4 space-y-2">
                        <div className="text-xs font-mono uppercase tracking-widest text-[#1A2F1C]/60">
                            Created
                        </div>
                        <div className="text-sm text-[#1A2F1C] font-sans">
                            {new Date(garden.createdAt).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default GardenEditSidebar;
